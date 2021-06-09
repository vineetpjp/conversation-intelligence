import React, { PureComponent } from "react";
import { ConversationUtil } from "../../../utils/ConversationUtil";

class SingleConversation extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      input: this.props.input,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.input !== state.input) {
      return {
        show: true,
        input: props.input,
      };
    }
    return null;
  }

  checkToRemoveComponent = (input, conversationIncludesMatch) => {
    if (input && !conversationIncludesMatch) {
      this.setState((prevState) => ({
        ...prevState,
        show: false,
      }));
    }
  };

  renderSingleConversation = () => {
    const { conversation, currentTime, setTime, input, setMatchingTermNo } =
      this.props;
    const length = conversation.length - 1; // starting from 0
    let conversationIncludesMatch = false;
    return conversation.map((wordInfo, index) => {
      const { word } = wordInfo;
      const matchSearch = input && word.toLowerCase().includes(input);
      if (matchSearch) {
        setMatchingTermNo();
        conversationIncludesMatch = true;
      }
      if (length === index)
        this.checkToRemoveComponent(input, conversationIncludesMatch);
      const startTime = ConversationUtil.getTimeAsNumber(wordInfo.startTime);
      const isActive = ConversationUtil.isWordActive(currentTime, wordInfo);

      return (
        <span
          onClick={() => setTime(startTime)}
          key={index}
          className={`conversation_word ${
            isActive ? "conversation_word--active" : ""
          } ${matchSearch ? "search_term" : ""}`}
        >
          {word}
          {` `}
        </span>
      );
    });
  };

  render() {
    const { isActive, conversation, leftMargin } = this.props;
    const { show } = this.state;
    const startTime = ConversationUtil.formatTime(conversation[0].startTime);
    return (
      <>
        {show ? (
          <div
            className={`conversation-container ${
              isActive ? "conversation-container--active" : ""
            } ${leftMargin ? "conversation-container-lpadding" : ""}`}
          >
            <span className={"conversation-time"}>{startTime}</span>
            <div className={"conversation-bar"} />
            <div className={`conversation_sentence `}>
              <div>{this.renderSingleConversation()}</div>
              <div className={"conversation-container_share"}>Share</div>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

export default SingleConversation;
