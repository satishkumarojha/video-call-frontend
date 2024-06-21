import { useEffect, useRef } from "react";

const UserFeedPlayer : React.FC<{stream?: MediaStream,isMute:boolean}> = ({stream,isMute}) => {

    const videoRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        if(videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);
    return (
       <div className="w-full h-full">
         <video
            ref={videoRef}
            style={{ width: '100%', height: '100%'}}
            muted={isMute}
            autoPlay
        />
       </div>
    )
}

export default UserFeedPlayer;