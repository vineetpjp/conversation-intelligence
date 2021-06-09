import React, { PureComponent} from 'react';

class ShareButton extends PureComponent {
    render() {
        return (
            <div className={'nav-share'}>
                <i className={'fas fa-share'}/>
                Share
            </div>
        );
    }
}

export default ShareButton;