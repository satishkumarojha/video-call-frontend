import { useContext } from "react";
import { SocketContext } from "../Context/SocketContext";

const CreateRoom: React.FC = () => {

    const { socket } = useContext(SocketContext);

    const initRoom = () => {
        console.log("Initialising a req to create a room", socket)
        socket.emit("create-room");
    }
    // 

    return (
       <div className="w-full h-full flex justify-center items-center" style={{
        backgroundImage: "url(https://images.unsplash.com/photo-1612831817984-97e394106fff?q=80&w=3125&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        backgroundPosition: "center center",
        backgroundRepeat: "no repeat",
        backgroundSize: "cover",
      }}>
         <button 
            onClick={initRoom}
            className="btn bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
        >
            Start a new meeting
        </button>
       </div>
    )
}

export default CreateRoom;