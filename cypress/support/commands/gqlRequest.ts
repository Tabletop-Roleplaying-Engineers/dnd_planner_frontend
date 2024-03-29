import { DocumentNode } from 'graphql/language/ast'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const authLink = setContext((_, { headers }) => {
  const userData = localStorage.getItem('AUTH_DATA')

  return {
    headers: {
      ...headers,
      authorization: userData || '',
    },
  }
})

const httpLink = new HttpLink({
  uri: `${Cypress.env('API_URL')}/`,
})

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export function gqlRequest<TRes = any>(data: {
  operationName: string
  variables?: any
  query: DocumentNode
}) {
  const token = localStorage.getItem('AUTH_DATA')
  cy.log(`GQL Request: ${data.operationName}`)

  return cy
    .request<{
      data: TRes | null
      errors?: {
        locations: any[]
        message: string
        path: string[]
      }[]
    }>({
      url: `${Cypress.env('API_URL')}/`,
      method: 'POST',
      headers: {
        authorization: token,
      },
      body: {
        ...data,
        // Need to clear `operationName` because server answers `Unknown operation named "{name}"`
        operationName: null,
      },
    })
    .then((res) => {
      if (res.body.errors?.length) {
        const errorMsg = res.body.errors.map((e) => e.message).join(', ')
        throw new Error(`GQL Error: ${errorMsg}`)
      }

      return res.body.data
    })
}
