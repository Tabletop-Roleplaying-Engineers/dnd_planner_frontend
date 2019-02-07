import { Layout } from 'antd'
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import GlobalStyle from 'noui/GlobalStyle'
import Header from 'layout/Header'
import Home from 'containers/Home'
import Players from 'containers/Players'
import NotFound from 'containers/NotFound'

class App extends Component {
  render() {
    return (
      <div>
        <GlobalStyle />
  
        <Layout>
          <Header />
          {/*TODO add routing here*/}
          <Layout.Content>
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route path='/players' component={Players}/>
  
              {/* 404*/}
              <Route component={NotFound}/>
            </Switch>
          </Layout.Content>
  
          {/*<Layout.Footer>footer</Layout.Footer>*/}
        </Layout>
      </div>
    );
  }
}

export default App;
