import React from 'react'; 
import { Button } from 'antd';

import './App.css';

const largeColumn = { width : '40%',
};
const midColumn = { width : '30%',
};
const smallColumn = { width : '10%',
};

function TableStyle({onDismiss, isSearched, list}) {

    return (

        <div className="table">

        {list.filter(isSearched).map(item => 

            <div className="table-row" key={item.objectID}>                
                
                <span style={largeColumn}>
                    <a href={item.url}>{item.title}</a>
                </span>
                <span style={midColumn}>
                    {item.author}
                </span>
                <span style={smallColumn}>
                    {item.num_comments}
                </span>
                <span style={smallColumn}>
                    {item.points}
                </span>
                <span style={smallColumn}>
                    <Button
                        type="primary"
                        onClick={() => onDismiss(item.objectID)}
                    >
                    Dismiss
                    </Button>
                </span>
            </div>
        )}
    </div>)
}

export default TableStyle;