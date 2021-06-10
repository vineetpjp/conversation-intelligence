import React, {Component} from 'react';
import "./scss/main.scss";
// import './App.scss';
import ConversationIntelligence from "components/conversation";

class App extends Component {
    render() {
        return (
            <div>
                <ConversationIntelligence />
            </div>
        );
    }
}

export default App;