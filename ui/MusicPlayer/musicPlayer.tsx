import AudioPlayer, { PlayerProps } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const MusicPlayer = (props: PlayerProps) => {

  const handleOnPlay=(e:any)=>{
    // console.log("onPlay");
  }

  return <AudioPlayer onPlay={(e) =>handleOnPlay(e) } {...props} />;
};

export default MusicPlayer;
