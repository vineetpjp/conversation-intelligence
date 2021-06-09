import React, { PureComponent } from "react";

class TranscriptSearch extends PureComponent {
  render() {
    const { input, clearInput, matchingTermNo, onInputChange } = this.props;
    return (
      <div className={"search-container"}>
        <div className={"search-input__container"}>
          <i className="fa fa-search search-icon" aria-hidden="true" />
          <input
            className={"search-input"}
            type="text"
            onChange={(e) => onInputChange(e)}
            value={input}
            placeholder={"Search call transcript"}
          />
        </div>
        <div className={"search-text"}>
          {matchingTermNo ? `${matchingTermNo} results ` : ""}
        </div>
        <div
          className={"search-text search-clear"}
          onClick={() => clearInput()}
        >
          {input ? ". clear search" : ""}
        </div>
      </div>
    );
  }
}

export default TranscriptSearch;
