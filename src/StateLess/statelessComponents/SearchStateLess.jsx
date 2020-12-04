import React from 'react';
import { Input } from 'antd';

const SearchStateLess = ({value, onChange, children}) => {
    return (
    <div className='search-container'>
        <div className='search-container_input-search'>
            <Input
                placeholder='Search'
                allowClear
                onChange={onChange}
                value={value}
                className='search-container_input-search'
            />
        </div>
    </div>)
}

export default SearchStateLess;