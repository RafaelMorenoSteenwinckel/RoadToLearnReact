import React, { Component } from 'react'; 
require ('./../App.css');
import SearchStateLess from "./statelessComponents/SearchStateLess";
import TableStateLess from "./statelessComponents/TableStateLess";
import { DatePicker, Button, Layout, PageHeader } from 'antd';
import 'antd/dist/antd.css';

const { Header, Footer, Content } = Layout;

const list = [  
{
  title : 'Roger - Stateless',
  url : 'https://gooble.be',
  author : 'Roger Moore',
  num_comments : 0,
  points : 5,
  objectID : 2,
},
{
  title : 'Maxime - Stateless',
  url : 'https://gooble.be',
  author : 'Maxime Moreno',
  num_comments : 0,
  points : 5,
  objectID : 3,
}
];

class AppStateLess extends Component { 

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
        <PageHeader
            className="site-page-header"
            title="React"
            subTitle="Exemples avec des statesless components"
          />
        <Layout>
          
          <Header>

            <SearchStateLess
              value={searchTerm}
              onChange={this.onSearchChange}
            >
            <DatePicker />
            <Button type="primary">Primary Button</Button>
          </SearchStateLess>
          </Header>

          <Content>
            <TableStateLess
              list={this.state.list}
              isSearched={this.isSearched}
              onDismiss={this.onDismiss}
            />
          </Content>
          <Footer>Mon footer</Footer>
          
        </Layout>
      </>
      );
    }
}
export default AppStateLess;