import React, {Component} from 'react';

class Table extends Component {

    render() {
        const {onDismiss, isSearched, list} = this.props;        

        return (
        <div>
            
            {list.filter(isSearched).map(item => 
                <div key={item.objectID}>
                    <span>
                        <a href={item.url}>{item.title}</a>
                    </span>
                    <span>{item.author}</span>
                    <span>{item.num_comments}</span>
                    <span>{item.points}</span>
                    <button
                        onClick={() => onDismiss(item.objectID)}>
                        delete
                    </button>
                </div>
            )}
        </div>
        )
    }
}

export default Table;