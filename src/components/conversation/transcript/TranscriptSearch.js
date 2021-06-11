import React, { PureComponent } from "react";

class TranscriptSearch extends PureComponent {
  render() {
    const { input, clearInput, matchingTerm:{no}, onInputChange } = this.props;
    const matchingTermNo = no;
    const resultOrResults = matchingTermNo===1;//true result | false results
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
          {matchingTermNo ? `${matchingTermNo} ${resultOrResults?'result':'results'} ` : ""}
        </div>
          {
              input?(
                  <div
                      className={"search-text search-clear"}
                      onClick={() => clearInput()}>
                      clear search
                  </div>
              ):null
          }
      </div>
    );
  }
}

export default TranscriptSearch;
