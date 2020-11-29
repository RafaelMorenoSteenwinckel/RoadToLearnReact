import React, { Component } from 'react'; 
import logo from './mandalorian.png';
import './App.css';
import Header from './Header';
import ExplainBindingComponent from './ExplainBindingComponent';
import Search from "./Search";
import Table from "./Table";

const list = [
  {
    title : 'React',
    url : 'https ://reactjs.org/',
    author : 'Jordan Walke',
    num_comments : 3,
    points : 4,
    objectID : 0,
}, {
    title : 'Redux',
    url : 'https ://redux.js.org/',
    author : 'Dan Abramov, Andrew Clark',
    num_comments : 2,
    points : 5,
    objectID : 1,
}, ];

class App extends Component { 

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
        {
          /*
            <ExplainBindingComponent />
          */
        }
        
        <Search
          value={searchTerm}
          onChange={this.onSearchChange}
        />
        <Table
          list={this.state.list}
          isSearched={this.isSearched}
          onDismiss={this.onDismiss}
        />
        
        { 
          /*
          <Header /> 
          */
        }
        <div className="App" id="testAutrerender">
          <header className="App-header">
            <h1 className="App-title">{title}</h1>
            <img src={logo} className="App-logo" alt="logo" />
          </header>
        </div> 
      </>
      );
    }
}
export default App;