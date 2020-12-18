import React, { Component } from 'react'; 

const uneListe = [
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

  const isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase()) ;

class Header extends Component { 

    constructor(props){
        super(props);

        this.state = {
            list: uneListe,
            searchedItem1: "",
            searchedItem2: ""
        };

        //car les méthodes de classe ne sont pas automatiquement liées au this de l’instance de la classe, donc on le bind de facon explicite
        this.deleteIt = this.deleteIt.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onSearchChangeList2 = this.onSearchChangeList2.bind(this);
        this.searchFilterFunction = this.searchFilterFunction.bind(this);
    }

    deleteIt(objectID) {

        /*
        function isNotId(item) {
            return item.objectID !== objectID;
        }

        const updatedList = this.state.list.filter(isNotId);
        */
        const updatedList = this.state.list.filter(item => item.objectID !== objectID);
        this.setState({list: updatedList});
    }

    onSearchChange(event) {
        this.setState({searchedItem1: event.target.value});
    }

    onSearchChangeList2(event) {
        this.setState({searchedItem2: event.target.value});
    }

    searchFilterFunction = (item) => {
        return item.title.toLowerCase().includes(this.state.searchedItem1.toLowerCase());
    }

    render() {
       
        return (
        <div>
            <h3>filtrage avec une methode de classe</h3>

            <form>
                <input type="text" placeholder="Enter a value" onChange={this.onSearchChange}></input>
            </form>

            {this.state.list.filter(this.searchFilterFunction).map(item => 
            <div key={item.objectID}>
                <span>
                    <a href={item.url}>{item.title}</a>
                </span>
                <span>{item.author}</span>
                <span>{item.num_comments}</span>
                <span>{item.points}</span>
                <button
                    onClick={() => this.deleteIt(item.objectID)}>
                    delete
                </button>
            </div>
            )}
            <h3>2em methode pour le filtrage avec une fonction en dehors dela classe</h3>

            <form>
                <input type="text" placeholder="Enter a value" value={this.state.searchTerm} onChange={this.onSearchChangeList2}></input>
            </form>

            {this.state.list.filter(isSearched(this.state.searchedItem2)).map(item => 
            <div key={item.objectID}>
                <span>
                    <a href={item.url}>{item.title}</a>
                </span>
                <span>{item.author}</span>
                <span>{item.num_comments}</span>
                <span>{item.points}</span>
                <button
                    onClick={() => this.deleteIt(item.objectID)}>
                    delete
                </button>
            </div>
            )}

        </div>        
        );
    }
}
export default Header;