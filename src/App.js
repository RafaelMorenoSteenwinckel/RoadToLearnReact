import React, { Component } from 'react'; 
import './App.css';
import Search from "./Search";
import Table from "./Table";
import  Fetch from './Fetch';
import { Layout, PageHeader, Alert } from 'antd';
import 'antd/dist/antd.css';

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
    this.state = {
      searchTerm : '',
      searchTermPoints : null,
      result: null,
      searchTermApi : DEFAULT_QUERY,
      isLoading: false,
      error: null
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
    
  }

  searchOnSubmit() {
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
    console.log ('render');
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
              placeholder="Recherche par titre ou url"
            />
            
            <Search
              value={searchTermPoints}
              onChange={this.onSearchChangePoints}
              placeholder="Recherche par points"
            />

            <div className="site-layout-content">

              {error && 
                <Alert
                  message="Error"
                  description={error}
                  type="error"
                  showIcon
                  closable
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

    fetchSearchTopStories(searchTermApi, page=0) {
      this.setState({isLoading: true});
      this.setState({error: null});
      
      axios.get(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTermApi}&${PARAM_PAGE}${page}`)
      .then(
        (fetchedList) => {

          this.setState(
            {
              result : fetchedList.data,
              isLoading: false
            }
          );
          if (!this.state.result.hits.length) {
            this.setState({error: `Pas de résultats pour : ${this.state.searchTermApi}`});
          }
        })
      .catch(error => this.setState({error: 'Error pour récupérer les données !'}));

      console.log('RESULT');
      console.log(this.state.result);
    }

    componentDidMount() {
      console.log ('componentDidMount');
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