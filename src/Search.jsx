import React, {Component} from 'react';
import { Input } from 'antd';

class Search extends Component {
    render() {

        const {value, onChange, children} = this.props;
        return (
            <>
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
                </div>
                {
                    /*
                        {children}
                    */
                }

                
            </>
        )
    }
}

export default Search;