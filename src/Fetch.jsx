import React, { Component } from 'react';
import {Button, Input} from 'antd';

class Fetch extends Component{

    constructor(props) {
        super(props);
    }

    render() {

        const {valueToFetch, onSubmit, onChange} = this.props;

        const monStyle = {padding: '1.5rem', textAlign: 'center'};

        return (
            <div style={monStyle}>
                <Input
                placeholder='Search'
                allowClear
                onChange={onChange}
                value={valueToFetch}
                className='search-container_input-search'
                />
                <div style={monStyle}>
                    <Button 
                        type="primary"
                        onClick={onSubmit}
                    >
                        Rechercher sur le serveur
                    </Button>
                </div>
            </div>
        );
    }
}

export default Fetch;