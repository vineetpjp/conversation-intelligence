import React, { PureComponent} from 'react';

class SpeedControl extends PureComponent {

    onSpeedClick = (speed=1) =>{
        const {setAudioState,audioRef} = this.props;
        audioRef.current.playbackRate = speed;
        setAudioState({playbackRate:speed})
    }

    renderSpeedOptions = () =>{
        const speedOptions = [0.5,1.0,1.5,2.0,2.5];
        return speedOptions.map((speed,index)=>{
            return <li onClick={()=>this.onSpeedClick(speed)} key={index}>{speed}</li>
        })
    }

    render() {
        const {currentPlaybackRate} = this.props;
        return (
            <div>
                <li className={'drop-down'}>
                    <div className={'audio-speed'}>
                        {currentPlaybackRate}
                    </div>
                    <span>x</span>
                    <ul className={'drop-down-content'}>
                        {this.renderSpeedOptions()}
                    </ul>
                </li>
            </div>
        );
    }
}

export default SpeedControl;