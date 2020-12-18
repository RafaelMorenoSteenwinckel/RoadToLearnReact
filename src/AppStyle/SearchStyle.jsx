import React from 'react';


const SearchStyle = ({value, onChange, children}) => {
    return (
    <div className='search-container'>
        <div className='search-container_input-search'>
            <form>
            <input
                placeholder='Search'
                onChange={onChange}
                value={value}
                className=''
            />
            </form>
        </div>
    </div>)
}

export default SearchStyle;