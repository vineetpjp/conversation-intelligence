import React, { Component } from "react";
import { ConversationUtil } from "../../../utils/ConversationUtil";
import SingleConversation from "./SingleConversation";
import TranscriptSearch from "./TranscriptSearch";
class Transcript extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word_timings: this.props.word_timings,
      input: "",
      matchingTermNo: 0,
    };
  }

  setMatchingTermNo = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        matchingTermNo: prevState.matchingTermNo + 1,
      };
    });
  };

  clearInput = () => {
    this.setState((prevState) => ({
      ...prevState,
      input: "",
    }));
  };

  onInputChange = (e) => {
    this.props.setAudioState({ playbackStatus: "pause" });
    this.props.audioRef?.current?.pause();
    this.setState((prevState) => ({
      ...prevState,
      input: e?.target?.value,
      matchingTermNo: 0,
    }));
  };

  renderConversation = () => {
    const { currentTime, setTime } = this.props;
    const { word_timings, input } = this.state;
    return word_timings.map((person, index) => {
      const isActive = ConversationUtil.isTranscriptActive(currentTime, person);
      return (
        <SingleConversation
          setMatchingTermNo={this.setMatchingTermNo}
          input={input}
          index={index}
          setTime={setTime}
          key={index}
          conversation={person}
          leftMargin={index % 2}
          isActive={isActive}
          currentTime={isActive ? currentTime : -1}
        />
      );
    });
  };

  render() {
    return (
      <div>
        <TranscriptSearch
          clearInput={this.clearInput}
          matchingTermNo={this.state.matchingTermNo}
          input={this.state.input}
          onInputChange={this.onInputChange}
        />
        <div className={"transcript-container"}>
          {this.renderConversation()}
        </div>
      </div>
    );
  }
}

export default Transcript;
