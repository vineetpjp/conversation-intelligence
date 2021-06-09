import React, { Component } from "react";
import { ConversationUtil } from "../../../utils/ConversationUtil";

class TimeStamp extends Component {
  render() {
    const { currentTime, duration } = this.props;
    const formattedCurrentTime = ConversationUtil.formatTime(currentTime);
    const formattedDuration = ConversationUtil.formatTime(duration);
    return (
      <div className={"time-stamp-container"}>
        <span className={"time-stamp-duration"}>{formattedCurrentTime}</span> /{" "}
        {formattedDuration}
      </div>
    );
  }
}

export default TimeStamp;
