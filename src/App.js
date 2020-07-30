import React, { useState } from 'react'
import { Layout } from 'antd'
import { Router } from 'react-router-dom'
import GlobalStyle from 'noui/GlobalStyle'
import Header from 'layout/Header'
import Routing, { history } from 'routing'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { setContext } from 'apollo-link-context'
import { getText } from './utils/storage'
import { UserContext } from './context/userContext'
import { decode } from './utils/jwt'
import { AUTH_STORAGE_KEY } from './constants'
import { messages } from 'intl/messagesUa'
import { IntlProvider } from 'react-intl'

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_HTTP_URL,
})

const authLink = setContext((_, { headers }) => {
  const userData = getText('AUTH_DATA')

  return {
    headers: {
      ...headers,
      authorization: userData || '',
    },
  }
})

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_API_WS_URL,
  options: {
    reconnect: true,
  },
})

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  authLink.concat(httpLink),
)

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
})

const getUser = () => {
  const token = getText(AUTH_STORAGE_KEY)
  const user = decode(token)

  if (user) {
    return {
      actions: [],
      roles: [],
      ...user,
    }
  }

  return null
}

const App = () => {
  const [user, setUser] = useState(getUser())
  const contextValue = {
    user,
    setUser,
  }

  return (
    <IntlProvider messages={messages} locale="ua" defaultLocale="ua">
      <UserContext.Provider value={contextValue}>
        <ApolloProvider client={client}>
          <ApolloHooksProvider client={client}>
            <Router history={history}>
              <React.Fragment>
                <GlobalStyle />

                <Layout>
                  <Header />
                  {/*TODO add routing here*/}
                  <Layout.Content>
                    <Routing />
                  </Layout.Content>

                  {/*<Layout.Footer>footer</Layout.Footer>*/}
                </Layout>
              </React.Fragment>
            </Router>
          </ApolloHooksProvider>
        </ApolloProvider>
      </UserContext.Provider>
    </IntlProvider>
  )
}

export default App
