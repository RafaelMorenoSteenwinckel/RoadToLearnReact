import React, { Component } from 'react';
import {Button, Input, Tooltip} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import MoreButton from './MoreButton';
import LessButton from './LessButton';

import PropTypes from 'prop-types';

class Fetch extends Component{

    constructor(props) {
        super(props);
    }

    render() {

        const {valueToFetch, onSubmit, onChange, fetchMore, fetchLess} = this.props;

        const monStyle = {padding: '1.5rem', display: 'inline-block', width: '30rem'};

        return (
            
            <div style={{'textAlign': 'center'}}>
                <form onSubmit={onSubmit}>
                    <div style={monStyle}>
                    <Input
                        placeholder='Rechercher sur le serveur'
                        allowClear
                        onChange={onChange}
                        value={valueToFetch}
                        className='search-container_input-search'
                    />
                    
                    <LessButton onSubmit={fetchLess}></LessButton>  
                    <Button 
                        type="primary" 
                        icon={<SearchOutlined/>}
                        onClick={onSubmit}
                    >
                        Rechercher sur le serveur
                    </Button>
                    <MoreButton onSubmit={fetchMore}></MoreButton>
                    </div>
                </form>
            </div>
        );
    }
}

export default Fetch;