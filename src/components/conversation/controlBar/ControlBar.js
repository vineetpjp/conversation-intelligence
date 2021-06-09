import React, {Component} from 'react';
import BasicControls from "./BasicControls";
import SpeedControl from "./SpeedControl";
import ShareButton from "./ShareButton";

class ControlBar extends Component {
    render() {
        const {playbackStatus,togglePlayback,setTime,duration,currentTime,setAudioState,audioRef,currentPlaybackRate} = this.props;
        const isPlaying = playbackStatus==='play';
        return (
            <div>
                <nav>
                    <ul>
                        <BasicControls currentTime={currentTime} setTime={setTime} duration={duration} togglePlayback={togglePlayback} isPlaying={isPlaying}/>
                        <SpeedControl currentPlaybackRate={currentPlaybackRate} setAudioState={setAudioState} audioRef={audioRef}/>
                    </ul>
                    <ShareButton/>
                </nav>
            </div>
        );
    }
}

export default ControlBar;