import React, { useState } from 'react'
import { ConfigProvider, Layout } from 'antd'
import { BrowserRouter } from 'react-router-dom'
import GlobalStyle from 'noui/GlobalStyle'
import Header from 'layout/Header'
import Routing from 'routing'
import {
  ApolloProvider,
  ApolloClient,
  split,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { setContext } from '@apollo/client/link/context'
import { getText } from './utils/storage'
import { UserContext } from './context/userContext'
import { decode } from './utils/jwt'
import { AUTH_STORAGE_KEY } from './constants'
import { messages } from 'intl/messagesUa'
import { IntlProvider } from 'react-intl'
import 'antd/dist/reset.css'

const httpLink = new HttpLink({
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
    <ConfigProvider theme={antdTheme}>
      <IntlProvider messages={messages} locale="uk" defaultLocale="ua">
        <UserContext.Provider value={contextValue}>
          <ApolloProvider client={client}>
            <BrowserRouter>
              <React.Fragment>
                <GlobalStyle />

                <Layout>
                  <Header />
                  {/*TODO add routing here*/}
                  <Layout.Content>
                    <Routing />
                  </Layout.Content>
                </Layout>
              </React.Fragment>
            </BrowserRouter>
          </ApolloProvider>
        </UserContext.Provider>
      </IntlProvider>
    </ConfigProvider>
  )
}

export default App

const antdTheme = {
  token: {
    colorPrimary: '#E40712',
    colorLink: '#1890ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#f5222d',
    colorTextHeading: 'rgba(0, 0, 0, .85)',
    colorText: 'rgba(0, 0, 0, .65)',
    colorTextSecondary: 'rgba(0, 0, 0, .45)',
    colorTextDisabled: 'rgba(0, 0, 0, .25)',
    borderRadius: '4px',
    colorBorder: '#d9d9d9',
    boxShadow: '0 2px 8px rgba(0, 0, 0, .15)',
  },
}
