import React, { Component } from 'react';
import {Button} from 'antd';

class LessButton extends Component {

    render () {

        const onSubmit = this.props.onSubmit;

        return <Button
            type="secondary"
            onClick={onSubmit}
            style={{marginRight: '2rem'}}
        >
            &lt;&lt;
        </Button>;
    }
}

export default LessButton;
