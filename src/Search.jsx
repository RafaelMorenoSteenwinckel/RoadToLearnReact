import React, {Component} from 'react';
import { Input } from 'antd';

class Search extends Component {

    render() {

        const {value, onChange, placeholder} = this.props;
        return (
            <>

                <div className='search-container' style={{height:'4rem', float: 'right'}}>
                    <div className='search-container_input-search'> 
                        <Input
                            placeholder={placeholder}
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