import React, {Component} from 'react';
import {ConversationUtil} from "../../../utils/ConversationUtil";

class BasicControls extends Component {

    skipAudioBySec(direction){
        const {currentTime,duration} = this.props
        const time = ConversationUtil.skipAudioBySec(direction,currentTime,duration);
        this.props.setTime(time);
    }

    render() {
        const {togglePlayback, isPlaying} = this.props;
        return (
            <div className={'audio-basic-controls'}>
                <li onClick={()=>this.skipAudioBySec(-1)} className={'audio-skip-icon'}><i className={'fas fa-undo'}/></li>
                <li onClick={togglePlayback}>
                    {isPlaying?(
                        <i className={'fas fa-pause audio-play-pause-icon'}/>
                    ):(
                        <i className={'fas fa-play audio-play-pause-icon'}/>
                    )}
                </li>
                <li onClick={()=>this.skipAudioBySec(1)} className={'audio-skip-icon'}><i className={'fas fa-redo'}/></li>
            </div>
        );
    }
}

export default BasicControls;