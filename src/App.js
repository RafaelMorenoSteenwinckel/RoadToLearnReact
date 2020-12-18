import React, { Component } from 'react'; 
import './App.css';
import Search from "./Search";
import Table from "./Table";
import  Fetch from './Fetch';
import { Layout, PageHeader } from 'antd';
import 'antd/dist/antd.css';

const { Header , Footer, Content } = Layout;
const axios = require('axios').default;
const DEFAULT_QUERY = 'ZELDA';
const PATH_BASE = 'https://hn.algolia.com/api/v1'; 
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;

class App extends Component { 

  constructor(props) {
    super(props);
    this.state = {
      searchTerm : '',
      result: null,
      searchTermApi : DEFAULT_QUERY,

    };

    //Input de recherche dans la liste
    this.onSearchChange = this.onSearchChange.bind(this);
    this.isSearched = this.isSearched.bind(this);

    //pour la table
    this.onDismiss = this.onDismiss.bind(this);


    //this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.searchOnSubmit = this.searchOnSubmit.bind(this);
    this.searchOnApiOnChange = this.searchOnApiOnChange.bind(this);
    
  }

  searchOnSubmit() {
    console.log ("On submit la !!!");
    const {searchTermApi} = this.state;
    this.fetchSearchTopStories(searchTermApi);
  }


  onDismiss(objectID) {

    const newList = this.state.result.hits.filter(
      item => item.objectID !== objectID
    );

    //this.setState({result: Object.assign({}, this.state.result, {hits:newList})});
    //Spread operator in action:

    this.setState({ result : {...this.state.result, hits:newList}});

  }

  onSearchChange(event) {
    this.setState({searchTerm: event.target.value});
  }

  searchOnApiOnChange(event) {
    this.setState({searchTermApi: event.target.value});
  }

  isSearched = (item) => {

    return item.title && item.title.toLowerCase().includes(this.state.searchTerm.toLowerCase())
      || item.url && item.url.toLowerCase().includes(this.state.searchTerm.toLowerCase())
      || item.points > this.state.searchTerm.toLowerCase();
  }

  render() {

    const {searchTerm, result, valueToFetch} = this.state;

    return (
      <>
        {
          /*
            <ExplainBindingComponent />
            <div style={{width: '100%', textAlign: 'center', marginBottom: '5rem', backgroundColor: 'black'}}>
              <img height='150px' src={saturn} />
            </div>
          */
        }
        
        <Layout>
          <PageHeader
            className="site-page-header"
            title="React"
            subTitle="Rechercher dans la liste des résultats"
          />
          
          <Header style={{height: '100%'}}>
            <Fetch
                  valueToFetch={valueToFetch}
                  onChange={this.searchOnApiOnChange}
                  onSubmit={this.searchOnSubmit}
              >
            </Fetch>
          </Header>

          <Content style={{ padding: '0 50px' }}>

            <Search
              value={searchTerm}
              onChange={this.onSearchChange}
            />
            
            <div className="site-layout-content">
              { result && 
              <Table
                list={result}
                isSearched={this.isSearched}
                onDismiss={this.onDismiss}
              />
              }
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Moreno Steenwinckel Rafael - Analyst/Scrum Master</Footer>
        </Layout>
      </>
      );
    }


    fetchSearchTopStories(searchTermApi) {
      axios.get(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTermApi}`)
      .then(
        (fetchedList) => {
          
          this.setState(
            {result : fetchedList.data}
          );
          //this.setSearchTopStories(result.data);
        })
      .catch(error => error);
    }

    componentDidMount() {

      const {searchTermApi} = this.state;
      this.fetchSearchTopStories(searchTermApi);
      
      /*
      fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
      */
    }
  

}
export default App;