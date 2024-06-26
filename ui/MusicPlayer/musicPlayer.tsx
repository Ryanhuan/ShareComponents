import AudioPlayer, { PlayerProps } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const MusicPlayer = (props: PlayerProps) => {

  const handleOnPlay=()=>{
    // console.log("onPlay");
  }

  return <AudioPlayer onPlay={() =>handleOnPlay() } {...props} />;
};

export default MusicPlayer;
