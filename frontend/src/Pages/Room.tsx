import { useContext, useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { SocketContext } from "../Context/SocketContext";
import UserFeedPlayer from "../Components/UserFeedPlayer";
import { VscUnmute } from "react-icons/vsc";
import { VscMute } from "react-icons/vsc";
import { IoIosVideocam } from "react-icons/io";
import { FaVideoSlash } from "react-icons/fa6";
import { FaPhoneSlash } from "react-icons/fa";



const Room: React.FC = () => {

    const { id } = useParams();
    const { socket, user, stream, peers,fetchUserFeed,removeUserFeed } = useContext(SocketContext);
    const[isMute,setIsMute] = useState<boolean>(true);
    const[isVideo,setIsVideo] = useState<boolean>(true);
    const navigate = useNavigate();
    const email = localStorage.getItem("user")

    useEffect(() => {
        if(user) {
            console.log("New user with id", user._id, "has joined room", id);
            socket.emit("joined-room", {roomId: id, peerId: user._id})
            fetchUserFeed();
        }

    }, [id, user, socket]); 

    const toggleVideo = ()=>{
        setIsVideo(!isVideo)
        if(isVideo){
            removeUserFeed()
        }else{
            fetchUserFeed();
        }
    }

    const leaveCall = ()=>{
        removeUserFeed();
        navigate("/login")
       
    }

    // const muteAudio = () => {
    //     if (stream) {
    //         stream.getAudioTracks().forEach(track => track.enabled = false);
    //     }
    // }

    // const unmuteAudio = () => {
    //     if (stream) {
    //         stream.getAudioTracks().forEach(track => track.enabled = true);
    //     }
    // }

    return(
        <div className="bg-gray-800 relative" style={{ height: 'calc(100vh - 40px)' }}>
           <div className="font-bold font-sans text-white w-full justify-center flex mb-2">
             Current room ID : {id}
           </div>
           {/* video box */}
           <div className="flex w-full items-center justify-center h-[600px] gap-5">
            {/* first user */}
          <div className="w-[60%]">
           <div className="px- pb-5 w-full h-[550px] border-[10px] rounded-xl py-2">
              <UserFeedPlayer stream={stream} isMute={isMute}/>
           </div>
           <p className="flex justify-center py-1 text-white font-bold">{JSON.parse(email as string)?.email}</p>
           </div>
         {/* other users */}
         {Object.keys(peers)?.length>0&&<div className="w-[40%]  overflow-auto h-[600px] border-[10px] rounded-xl py-2">
                <div className="flex gap-2 px-5  max-w-[550px] h-auto flex-wrap">
                {Object.keys(peers).map((peerId) => (
                    <>
                        <div className="w-full h-full max-h-[250px] max-w-[250px] border-[5px] border-gray-700 rounded-md">
                        <UserFeedPlayer key={peerId} stream={peers[peerId].stream} isMute/>
                        </div>
                    </>
                ))}
                </div>
            </div>}
            
           </div>
           <div className="w-full h-[100px] absolute bottom-0 justify-center gap-8 left-0 right-0 flex bg-slate-400">
           {!isMute?<VscUnmute size={50} cursor="pointer" onClick={()=>setIsMute(!isMute)}/>:<VscMute size={50} onClick={()=>setIsMute(!isMute)} cursor="pointer"/>}
           {isVideo?<IoIosVideocam size={50} cursor="pointer" onClick={toggleVideo}/>:<FaVideoSlash size={50} cursor="pointer" onClick={toggleVideo}/>}
           <FaPhoneSlash size={50} cursor="pointer" onClick={leaveCall}/>
           </div>
        </div>
      
    )
}

export default Room;