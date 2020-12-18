import React, {Component} from 'react';
import { Input } from 'antd';

class Search extends Component {
    render() {

        const {value, onChange} = this.props;
        return (
            <>
                <div className='search-container' style={{height:'5rem'}}>
                    <div className='search-container_input-search'>
                        
                        <Input
                            placeholder='Rechercher dans la liste'
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