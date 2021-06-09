import React, { PureComponent } from "react";
import { ConversationUtil } from "../../../utils/ConversationUtil";

class TalkTimePercentage extends PureComponent {
  render() {
    const { word_timings } = this.props;
    const [user1percent, user2percent] =
      ConversationUtil.getRespectivePercentageOfUserConversation(word_timings);
    return (
      <div className={"user-percent--container"}>
        <div className={"user-percent"}>{user1percent}% YOU</div>
        <div className={"user-percent--divider"} />
        <div className={"user-percent"}>{user2percent}% MICHAEL B.</div>
      </div>
    );
  }
}

export default TalkTimePercentage;
