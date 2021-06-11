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
      matchingTerm: {no:0,matchingWordStartTime:[]},
    };
  }

  setMatchingTermNo = (startTime) => {
    this.setState((prevState) => {
      const prevMatchingWordStartTime = prevState.matchingTerm.matchingWordStartTime
      if(prevMatchingWordStartTime.includes(startTime)){
        return prevState;
      }
      return {
        ...prevState,
        matchingTerm: {no:prevState.matchingTerm.no + 1,matchingWordStartTime: [...prevMatchingWordStartTime,startTime]},
      };
    });
  };

  clearInput = () => {
    this.setState((prevState) => ({
      ...prevState,
      input: "",
      matchingTerm:{no:0,matchingWordStartTime:[]}
    }));
  };

  onInputChange = (e) => {
    this.props.setAudioState({ playbackStatus: "pause" });
    this.props.audioRef?.current?.pause();
    this.setState((prevState) => ({
      ...prevState,
      input: e?.target?.value,
      matchingTerm:{no:0,matchingWordStartTime:[]}
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
          matchingTerm={this.state.matchingTerm}
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
