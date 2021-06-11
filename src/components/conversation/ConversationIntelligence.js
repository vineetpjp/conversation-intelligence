import React, { Component } from "react";
import sound from "assets/59e106639d79684277df770d.wav";
import ControlBar from "./controlBar/ControlBar";
import Transcript from "./transcript/Transcript";
import WaveForm from "./waveform/WaveForm";
import data from "./data.json";
// import Audio from "./helper/Audio";
class ConversationIntelligence extends Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
    this.state = {
      word_timings: data.word_timings,
      currentTime: 0,
      duration: 0,
      playbackStatus: "pause",
      playbackRate: 1.0,
      isLoading: true,
    };
  }

  setAudioState = (newState) => {
    this.setState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  setTime = (seconds) => {
    this.audioRef.current.currentTime = seconds;
    this.setAudioState({currentTime:seconds})
  };

  togglePlaybackStatus = () => {
    const { playbackStatus } = this.state;
    if (playbackStatus === "play") {
      this.audioRef.current.pause();
      this.setAudioState({
        playbackStatus: "pause",
      });
    }
    if (playbackStatus === "pause") {
      this.audioRef.current.play();
      this.setAudioState({
        playbackStatus: "play",
      });
    }
  };

  render() {
    return (
      <div>
        {/*<Audio sound={sound} setAudioState={this.setAudioState} audioRef={this.audioRef} forwardedRef={this.audioRef}/>*/}
        <audio
          src={sound}
          hidden
          ref={this.audioRef}
          onLoadedData={() => {
            this.setAudioState({
              playbackStatus: "pause",
              isLoading: false,
              duration: this.audioRef.current.duration,
            });
          }}
          onTimeUpdate={() => {
            this.setAudioState({
              currentTime: this.audioRef.current.currentTime,
            });
          }}
          onEnded={() => {
            this.audioRef.current.pause();
            this.setAudioState({
              playbackStatus: "pause",
            });
          }}
        />
        <ControlBar
          currentPlaybackRate={this.state.playbackRate}
          setAudioState={this.setAudioState}
          audioRef={this.audioRef}
          currentTime={this.state.currentTime}
          setTime={this.setTime}
          duration={this.state.duration}
          togglePlayback={this.togglePlaybackStatus}
          playbackStatus={this.state.playbackStatus}
        />
        <WaveForm
          word_timings={this.state.word_timings}
          duration={this.state.duration}
          currentTime={this.state.currentTime}
          setTime={this.setTime}
        />
        <Transcript
          word_timings={this.state.word_timings}
          setAudioState={this.setAudioState}
          audioRef={this.audioRef}
          setTime={this.setTime}
          currentTime={this.state.currentTime}
        />
      </div>
    );
  }
}

export default ConversationIntelligence;
