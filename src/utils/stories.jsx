import React from 'react'
import { Router } from 'react-router-dom'
import history from 'routing/history'
import GlobalStyle from 'noui/GlobalStyle'
import { Layout } from 'antd'
import { Header } from 'ui/Text'

export const RouterProvider = ({ children }) => {
  return (
    <Router history={history}>{children}</Router>
  )
}

export const StyleProvider = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Header />
        <Layout.Content>
          {children}
        </Layout.Content>
      </Layout>
    </>
  )
}

export const Providers = ({ children }) => {
  return (
    <>
      <StyleProvider>
        <RouterProvider>
          {children}
        </RouterProvider>
      </StyleProvider>
    </>
  )
}
