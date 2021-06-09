import React from "react";

const Audio = React.forwardRef((props, ref) => {
  const { sound, setAudioState, audioRef } = props;
  console.log(ref, audioRef, "--------------------");
  return (
    <audio
      src={sound}
      hidden
      ref={ref}
      onLoadedData={() => {
        setAudioState({
          playbackStatus: "pause",
          isLoading: false,
          duration: audioRef.current.duration,
        });
      }}
      onTimeUpdate={() => {
        console.log(audioRef.current.currentTime);
        setAudioState({
          currentTime: audioRef.current.currentTime,
        });
      }}
      onEnded={() => {
        audioRef.current.pause();
        setAudioState({
          playbackStatus: "pause",
        });
      }}
    />
  );
});

export default Audio;
