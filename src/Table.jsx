import React, {Component} from 'react';
import { Card, Button, Table as AntTable, Tag } from 'antd';
import './App.css';
import { PresetColorTypes } from 'antd/lib/_util/colors';


class Table extends Component {

    constructor(props) {
        super(props);
        //componentDidUpdate
    }

/*
    static getDerivedStateFromProps(props, state) {
        console.log ("getDerivedStateFromProps");
        return null;
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate");
        return true;
    }*/

    render() {
        
        const {onDismiss, isSearched, list, isLoading, isSearchedPoint} = this.props;

          const columns = [
            {
              title: 'Title',
              dataIndex: 'title',
              key: 'title',
              sorter: (a,b) => a.title && a.title.localeCompare(b.title),
            },
            {
                title: 'Author',
                dataIndex: 'author',
                key: 'author',
                sorter: (a,b) => a.author.localeCompare(b.author),
            },
            {
                title: 'Num. comments',
                dataIndex: 'num_comments',
                key: 'num_comments',
                sorter: (a,b) => a.num_comments - b.num_comments,
            },
            {
                title: 'Points',
                dataIndex: 'points',
                key: 'points',
                sorter: (a, b) => a.points - b.points,
                render: (points) => {
                    let color = 'green';
                    if (points < 500) color = 'geekblue';
                    if (points < 300) color = 'volcano';
                    return (
                    <>
                        <Tag color={color} key={points}>
                          {points}
                        </Tag>
                    </>)
                } 
            },
            {
                title: 'Url',
                dataIndex: 'url',
                key: 'url',
            },
            {
                title: 'Actions',
                dataIndex: 'action',
                key: 'action',
                render: (item) => {
                    return (
                    <Button
                        type="primary"                  
                            onClick={() => onDismiss(item.objectID)}>
                        delete
                    </Button>
                    )
     
                }
            },
          ];
        let allData = [];

        if (list && list.hits && list.hits.length) {
                allData=list.hits.filter(isSearched).filter(isSearchedPoint).map(item => {

                    return {
                        key: item.objectID,
                        title: item.title,
                        author: item.author,
                        num_comments : item.num_comments,
                        points: item.points,
                        url: item.url,
                        action: item
                    }
                }
            )
        }
        
        return (
        <div>
            {allData && <AntTable bordered dataSource={allData} loading={isLoading} columns={columns} />}
        </div>
        )
    }

/*
    componentDidCatch(error, info) {
        //Pour catch des erreurs qui se produisent dans le composant
        console.log ("ERROR !!!!");
        console.log (error);
        console.log (info);
    }

    getSnapshotBeforeUpdate() {
        console.log("getSnapshotBeforeUpdate");
        return this.state;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //si getSnapshotBeforeUpdate existe le snapshot sera le return de cette fonction
        console.log("componentDidUpdate");
    }

    componentWillUpdate(nextProps, nextState){
        console.log ("Cest DEAD il faut use : getSnapshotBeforeUpdate");
    }

    componentWillUnmount() {
        console.log("componentWillUnmount");
    }

    componentDidMount() {
        console.log("componentDidMount : C'est le moment parfait pour aller choper des données via une API ! C'est pla une seule fois !");
    }*/
}

export default Table;