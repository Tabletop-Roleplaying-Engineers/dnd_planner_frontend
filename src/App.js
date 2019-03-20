import { Layout } from 'antd'
import React, { Component } from 'react'
import { Router } from 'react-router-dom'
import GlobalStyle from 'noui/GlobalStyle'
import Header from 'layout/Header'
import Routing, { history } from 'routing'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

const httpLink = createHttpLink({
  uri: 'https://dnd-planner.herokuapp.com/'
})

const wsLink = new WebSocketLink({
  uri: `ws://dnd-planner.herokuapp.com/`,
  options: {
    reconnect: true,
  }
})

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router history={history}>
          <React.Fragment>
            <GlobalStyle/>

            <Layout>
              <Header/>
              {/*TODO add routing here*/}
              <Layout.Content>
                <Routing/>
              </Layout.Content>

              {/*<Layout.Footer>footer</Layout.Footer>*/}
            </Layout>
          </React.Fragment>
        </Router>
      </ApolloProvider>
    )
  }
}

export default App
