import React from 'react'; 
import { Card, Button } from 'antd';

require ('../../App.css');

function TableStateLess({onDismiss, isSearched, list}) {

    return (
    <div className="cards">
        {list.filter(isSearched).map(item => 

            <div className="site-card-border-less-wrapper" key={item.objectID}>
                <Card title={item.title} bordered style={{ width: 300 }}>
                
                <p>URL : <a href={item.url}>{item.title}</a></p>
                <p>{item.author}</p>
                <p>Nombre de commentaires : {item.num_comments}</p>
                <p>Nombre de points : {item.points}</p>

                <Button
                    type="primary"
                    onClick={() => onDismiss(item.objectID)}>
                    delete
                </Button>
                </Card>      
            </div>
        )}
    </div>)
}

export default TableStateLess;