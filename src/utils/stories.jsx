import React from 'react'
import { Router } from 'react-router-dom'
import GlobalStyle from 'noui/GlobalStyle'
import { Layout } from 'antd'
import { Header } from 'ui/Text'

export const RouterProvider = ({ children }) => {
  return <Router>{children}</Router>
}

export const StyleProvider = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Header />
        <Layout.Content>{children}</Layout.Content>
      </Layout>
    </>
  )
}

export const Providers = ({ children }) => {
  return (
    <>
      <StyleProvider>
        <RouterProvider>{children}</RouterProvider>
      </StyleProvider>
    </>
  )
}
