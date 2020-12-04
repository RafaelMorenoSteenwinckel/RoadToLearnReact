import React, { Component } from 'react'; 
import './App.css';
import Search from "./Search";
import Table from "./Table";
import { DatePicker, Button, Layout, PageHeader } from 'antd';
import 'antd/dist/antd.css';
const { Header , Footer, Content } = Layout;

const DEFAULT_QUERY = 'ZELDA';
const PATH_BASE = 'https://hn.algolia.com/api/v1'; 
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;

class App extends Component { 

  constructor(props) {
    super(props);
    this.state = {
      searchTerm : DEFAULT_QUERY,
      result: null
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.isSearched = this.isSearched.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
  }

  componentDidMount() {

    console.log ("componentDidMount");

    const {searchTerm} = this.state.searchTerm;
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
    .then(response => response.json())
    .then(result => this.setSearchTopStories(result))
    .catch(error => error);
  }

  setSearchTopStories(result) {
    this.setState(
      {result}
    );
  }

  onDismiss(objectID) {

    const newList = {hits:[]};
    newList.hits = this.state.result.hits.filter(
      item => item.objectID !== objectID
    );

    this.setState({result: newList});
  }

  onSearchChange(event) {
    this.setState({searchTerm: event.target.value});
  }

  isSearched = (item) => {
    return item.title.toLowerCase().includes(this.state.searchTerm.toLowerCase())
      || item.url.toLowerCase().includes(this.state.searchTerm.toLowerCase())
      || item.points > this.state.searchTerm.toLowerCase();
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
        <Layout>
        <PageHeader
          className="site-page-header"
          title="React"
          subTitle="Exemples avec des classes ES6"
        />
          <Header>

            <Search
              value={searchTerm}
              onChange={this.onSearchChange}
            >
              <DatePicker />
              <Button type="primary">Primary Button</Button>
            </Search>
          </Header>

          <Content style={{ padding: '0 50px' }}>
            <div className="site-layout-content">
              <Table
                list={this.state.result}
                isSearched={this.isSearched}
                onDismiss={this.onDismiss}
              />
            </div>

          </Content>

          <Footer style={{ textAlign: 'center' }}>Moreno Steenwinckel Rafael - Analyst/Scrum Master</Footer>
        </Layout>


      </>
      );
    }
}
export default App;