import React, { Component } from "react";
import { ConversationUtil } from "../../../utils/ConversationUtil";

class WaveBar extends Component {
  renderBars() {
    const { word_timings, duration, currentTime, setTime } = this.props;
    const [increment, total] = ConversationUtil.getBarsInfoUsingWordTimings(
      word_timings,
      duration
    );
    const arr = new Array(total || 0).fill(1);
    let sentenceIndex = 0;

    return arr.map((item, index) => {
      const indexDuration = (index + 1) * increment;
      const alreadyRed = indexDuration < currentTime;

      const [newIndex, isUser] = ConversationUtil.isUserAtIndex(
        sentenceIndex,
        word_timings,
        indexDuration
      );
      const { user1, user2 } = ConversationUtil.getClasses(
        sentenceIndex,
        isUser,
        alreadyRed
      );
      sentenceIndex = newIndex;

      return (
        <div
          key={index}
          onClick={() => setTime(indexDuration)}
          className={"wavebar-column-container"}
        >
          <div className={`single-bar ${user1}`} />
          <div
            className={`single-bar-divider ${
              alreadyRed ? "single-bar-divider__fade" : ""
            }`}
          />
          <div className={`single-bar ${user2}`} />
        </div>
      );
    });
  }

  render() {
    return (
      <div className={"wavebar-top-container"}>
        <div className={"wavebar-start-line"} />
        <div className={"wavebar-container"}>{this.renderBars()}</div>
        <div className={"wavebar-start-line"} />
      </div>
    );
  }
}

export default WaveBar;
