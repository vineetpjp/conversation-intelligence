import React, { Component } from "react";
import TalkTimePercentage from "./TalkTimePercentage";
import TimeStamp from "./TimeStamp";
import WaveBar from "./WaveBar";
import WindowResize from "../../WindowResize";

class WaveForm extends Component {
  render() {
    const { setTime, currentTime, word_timings, duration } = this.props;
    return (
      <div className={"waveform-container"}>
        <TimeStamp duration={duration} currentTime={currentTime} />
        <div className={"waveform-timebar-container"}>
          <TalkTimePercentage word_timings={word_timings} />
          <WaveBar
            duration={duration}
            setTime={setTime}
            currentTime={currentTime}
            word_timings={word_timings}
          />
        </div>
      </div>
    );
  }
}

export default WindowResize(WaveForm,'width');
