import { Layout } from 'antd'
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import GlobalStyle from 'noui/GlobalStyle'
import Header from 'layout/Header'
import Home from 'containers/Home'
import Players from 'containers/Players'
import Profile from 'containers/Profile'
import NotFound from 'containers/NotFound'
import {
    BrowserRouter as Router
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
      <React.Fragment>
        <GlobalStyle />

        <Layout>
          <Header />
          {/*TODO add routing here*/}
          <Layout.Content>
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route path='/players' component={Players}/>
              <Route path='/profile' component={Profile}/>

              {/* 404*/}
              <Route component={NotFound}/>
            </Switch>
          </Layout.Content>

          {/*<Layout.Footer>footer</Layout.Footer>*/}
        </Layout>
      </React.Fragment>
      </Router>
    );
  }
}

export default App;
