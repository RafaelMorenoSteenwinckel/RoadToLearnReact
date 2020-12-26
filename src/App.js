import React, { Component } from 'react'; 
require 'App.css';
import Search from "./Search";
import Table from "./Table";
import  Fetch from './Fetch';
import { Layout, Alert } from 'antd';
// import 'antd/dist/antd.css';

import 'antd/dist/antd.dark.css';
import 'antd/dist/antd.compact.css';

// require ('./import-export/import.js');

const { Header , Footer, Content } = Layout;
const axios = require('axios').default;
const DEFAULT_QUERY = '';
const PATH_BASE = 'https://hn.algolia.com/api/v1'; 
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;

class App extends Component { 

  constructor(props) {
    super(props);
    let _isMounted = false;
    this.state = {
      searchTerm : '',
      searchTermPoints : null,
      result: null,
      searchTermApi : DEFAULT_QUERY,
      isLoading: false,
      error: null,
      page:0
    };

    //Input de recherche dans la liste
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchChangePoints = this.onSearchChangePoints.bind(this);
    this.isSearched = this.isSearched.bind(this);
    this.isSearchedPoint = this.isSearchedPoint.bind(this);

    //pour la table
    this.onDismiss = this.onDismiss.bind(this);

    //this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.searchOnSubmit = this.searchOnSubmit.bind(this);
    this.searchOnApiOnChange = this.searchOnApiOnChange.bind(this);
    this.fetchMore = this.fetchMore.bind(this);
    this.fetchLess = this.fetchLess.bind(this);
  }

  async fetchMore() {

    const {searchTermApi} = this.state;
      const inc = this.state.page + 1;
      await this.setState({ page:inc }); 
      this.fetchSearchTopStories(searchTermApi, this.state.page);

/*
    if (this._isMounted) {
      const {searchTermApi} = this.state;
      const inc = this.state.page + 1;
      this.setState({ page:inc }, () => {
        this.fetchSearchTopStories(searchTermApi, this.state.page);
      }); 
    }*/
  }

   fetchLess() {
    const {searchTermApi} = this.state;
    const dec = this.state.page - 1;

     this.setState({ page:dec });
      console.log ("Here ! : " + this.state.page);
      this.fetchSearchTopStories(searchTermApi, this.state.page);

    /*if (this._isMounted) {
      const {searchTermApi} = this.state;
      const dec = this.state.page - 1;
      if (this.state.page === 0) {
        this.setState({error: "Problème dans la pagination voulue... Valeur négative..."});
        return;
      }
      /*this.setState({ page:dec }, () => {
        this.fetchSearchTopStories(searchTermApi, this.state.page);
      });*/

     /* await this.setState({ page:dec });
      console.log ("Here ! : " + this.state.page);
      this.fetchSearchTopStories(searchTermApi, this.state.page);
    }*/
  }

  searchOnSubmit(event) {

    event.preventDefault();
    this.setState({page: 0}, () => {
      const {searchTermApi, page} = this.state;
      this.fetchSearchTopStories(searchTermApi, page);
    });
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

  onSearchChangePoints(event) {
    if (event.target.value < 0 || event.target.value > 1000) {
      this.setState({error: 'Recherche sur les points incorrect'});
    } else {
      this.setState({searchTermPoints: event.target.value});
      this.setState({error: null});
    }
  }

  searchOnApiOnChange(event) {
    this.setState({searchTermApi: event.target.value});
  }

  isSearchedPoint = (item) => {
    return item.points > this.state.searchTermPoints;
  }

  isSearched = (item) => {
    return item.title && item.title.toLowerCase().includes(this.state.searchTerm.toLowerCase())
      || item.url && item.url.toLowerCase().includes(this.state.searchTerm.toLowerCase());
  }

  render() {

    const {searchTerm, searchTermPoints, result, valueToFetch, isLoading, error} = this.state;
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

          
          <Header style={{height: '100%'}}>
            <Fetch
                  valueToFetch={valueToFetch}
                  onChange={this.searchOnApiOnChange}
                  onSubmit={this.searchOnSubmit}
                  fetchMore={this.fetchMore}
                  fetchLess={this.fetchLess}
              >
            </Fetch>
          </Header>

          <Content style={{ padding: '0 50px' }}>

          <div className="site-layout-content">
            <Search
              value={searchTerm}
              onChange={this.onSearchChange}
              placeholder="Recherche par titre ou url"
            />
            
            <Search
              value={searchTermPoints}
              onChange={this.onSearchChangePoints}
              placeholder="Recherche par points"
            />
            </div>
            <div className="site-layout-content">

              {error && 
                <Alert
                  message="Error"
                  description={error}
                  type="error"
                  showIcon
                  closable
                  style={{display: 'block'}}
                />
              }

              { result && result.hits.length > 0  &&
              <Table
                list={result}
                isSearched={this.isSearched}
                isSearchedPoint={this.isSearchedPoint}
                onDismiss={this.onDismiss}
                isLoading={isLoading}
              />
              }
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>


            {
              /*
            Dans l’ensemble le processus de montage a 4 méthodes de cycle de vie. Elles sont invoquées dans l’ordre suivant :
              <ul>
                <li>constructor()</li>
                <li>getDerivedStateFromProps()</li>
                <li>render()</li>
                <li>componentDidMount()</li>
              </ul>


            Cycle de vie de la mise à jour d’un composant qui se produit lorsque l’état ou les propriétés changent 
            <ul>
                <li>getDerivedStateFromProps()</li>
                <li>shouldComponentUpdate()</li>
                <li>render()</li>
                <li>getSnapshotBeforeUpdate()</li>
                <li>componentDidUpdate()</li>
              </ul>
            */
            }
            Moreno Steenwinckel Rafael - Analyst/Scrum Master
            
          </Footer>
        </Layout>
      </>
      );
    }

    fetchSearchTopStories(searchTermApi, page) {
      this.setState({isLoading: true});
      this.setState({error: null});

      console.log ('fetchSearchTopStories' + this.state.page);

      axios.get(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTermApi}&${PARAM_PAGE}${page}`)
      .then(
        (fetchedList) => {
          //Cela evite un warning dans le cas ou le user click ailleur (se casse ?) et qu'on tente de setter un state alors que le coposant est déjà demonté
        
          if (this._isMounted) {
            this.setState(
              {
                result : fetchedList.data,
                isLoading: false
              }
            );
            if (!this.state.result.hits.length) {
              this.setState({error: `Pas de résultats pour : ${this.state.searchTermApi}`});
            }
          }
        })
      .catch(error => this._isMounted && this.setState({error: 'Error pour récupérer les données !'}));
    }

    componentDidMount() {
      this._isMounted = true;
      console.log ('componentDidMount' + this.state.page);
      const {searchTermApi, page} = this.state;
      this.fetchSearchTopStories(searchTermApi, page);
      
      /*
      fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
      */
    }

    componentWillUnmount() {
      this._isMounted = false;
    }
  

}
export default App;