import React from 'react';

function WindowResize(WrappedComponent,affectOn){
    return class extends React.Component {
        state = { width: 0, height: 0 };

        updateDimensions = () => {
            if(!affectOn){
                this.setState({ width: window.innerWidth, height: window.innerHeight });
            }
            if(affectOn && affectOn === 'width'){
                if(window.innerWidth !== this.state.width){
                    this.setState({ width: window.innerWidth, height: window.innerHeight });
                }
            }else if(affectOn && affectOn ==='height'){
                if(window.innerHeight !== this.state.height){
                    this.setState({ width: window.innerWidth, height: window.innerHeight });
                }
            }
        };

        componentDidMount() {
            window.addEventListener('resize', this.updateDimensions);
        }

        componentWillUnmount() {
            window.removeEventListener('resize', this.updateDimensions);
        }

        render() {
            return <WrappedComponent {...this.props}/>;
        }
    }
}


export default WindowResize;
