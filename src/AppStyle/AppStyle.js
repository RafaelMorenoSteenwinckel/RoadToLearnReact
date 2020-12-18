import React, { Component } from 'react'; 
import './App.css';
import SearchStyle from "./SearchStyle";
import TableStyle from "./TableStyle";
import 'antd/dist/antd.css';
const list = [  
{
  title : 'Roger - Styled',
  url : 'https://gooble.be',
  author : 'Roger Moore',
  num_comments : 0,
  points : 5,
  objectID : 0,
},
{
  title : 'Maxime - Styled',
  url : 'https://gooble.be',
  author : 'Maxime Moreno',
  num_comments : 0,
  points : 5,
  objectID : 1,
},
{
    title : 'Jimmy - Styled',
    url : 'https://gooble.be',
    author : 'Maxime Moreno',
    num_comments : 0,
    points : 5,
    objectID : 2,
  },
  {
    title : 'Albert - Styled',
    url : 'https://gooble.be',
    author : 'Maxime Moreno',
    num_comments : 0,
    points : 5,
    objectID : 3,
  },
  {
    title : 'Mourad - Styled',
    url : 'https://gooble.be',
    author : 'Maxime Moreno',
    num_comments : 0,
    points : 5,
    objectID : 4,
  }
];

class AppStyle extends Component { 

  constructor(props) {
    super(props);
    this.state = {
      searchTerm : '',
      list
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.isSearched = this.isSearched.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss(objectID) {

    const newList = this.state.list.filter(
      item => item.objectID !== objectID
    );
    this.setState({list: newList});
  }

  onSearchChange(event) {
    this.setState({searchTerm: event.target.value});
  }

  isSearched = (item) => {
    return item.title.toLowerCase().includes(this.state.searchTerm.toLowerCase());
  }

  render() {
    const title = "This is the way !";
    const {searchTerm} = this.state;
    return (
      <>
        <div className="page">
            <div className="interactions">
                <SearchStyle
                value={searchTerm}
                onChange={this.onSearchChange}
                />
            </div>
            
            <TableStyle
              list={this.state.list}
              isSearched={this.isSearched}
              onDismiss={this.onDismiss}
            />
        </div>
      </>
      );
    }
}
export default AppStyle;