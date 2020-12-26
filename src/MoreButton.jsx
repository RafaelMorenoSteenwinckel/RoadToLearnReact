import React, { Component } from 'react';
import {Button} from 'antd';

class MoreButton extends Component {

    render () {

        const onSubmit = this.props.onSubmit;

        return <Button
            type="secondary"
            onClick={onSubmit}
            style={{marginLeft: '2rem'}}
        >
            &gt;&gt;

        </Button>;
    }
}

export default MoreButton;
