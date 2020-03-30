import gql from 'graphql-tag'

export const FETCH_RULES = gql`
  {
    rules {
      title
      rules
    }
  }
`