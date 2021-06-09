import React, { Component } from "react";
import { ConversationUtil } from "../../../utils/ConversationUtil";

class WaveBar extends Component {
  renderBars(i) {
    const { word_timings, duration, currentTime, setTime } = this.props;
    const [increment, total] = ConversationUtil.getBarsInfoUsingWordTimings(
      word_timings,
      duration
    );
    const arr = new Array(total || 0).fill(1);
    let sentenceIndex = i;
    let color = i ? "single-bar-blue" : "single-bar-purple";

    return arr.map((item, index) => {
      let colorClass = color;
      const indexDuration = (index + 1) * increment;
      const alreadyRed = indexDuration < currentTime;

      const [newIndex, isUser] = ConversationUtil.isUserAtIndex(
        sentenceIndex,
        word_timings,
        indexDuration
      );
      console.log(newIndex, isUser);
      if (!isUser) {
        colorClass = "single-bar-transparent";
      }
      sentenceIndex = newIndex;
      if (alreadyRed && colorClass !== "single-bar-transparent") {
        colorClass = "single-bar-fade";
      }
      console.log(colorClass);
      return (
        <div
          onClick={() => setTime(indexDuration)}
          className={`single-bar ${colorClass}`}
          key={index}
        />
      );
    });
  }

  render() {
    return (
      <div className={"wavebar-top-container"}>
        <div className={"wavebar-start-line"} />
        <div className={"wavebar-container"}>
          <div className={"wavebar-row-container"}>{this.renderBars(0)}</div>
          <div className={"single-bar-divider"} />
          <div className={"wavebar-row-container"}>{this.renderBars(1)}</div>
        </div>
        <div className={"wavebar-start-line"} />
      </div>
    );
  }
}

export default WaveBar;
