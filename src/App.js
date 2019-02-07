import { Layout } from 'antd'
import React, { Component } from 'react';
import GlobalStyle from 'noui/GlobalStyle'
import Header from 'layout/Header'
import Home from 'containers/Home'

class App extends Component {
  render() {
    return (
      <div className="App">
        <GlobalStyle />
  
        <Layout>
          <Header />
          {/*TODO add routing here*/}
          <Layout.Content>
            <Home />
          </Layout.Content>
  
          {/*<Layout.Footer>footer</Layout.Footer>*/}
        </Layout>
      </div>
    );
  }
}

export default App;
