import gql from 'graphql-tag'

export {
  AVAILABLE_CHARACTERS,
  CREATE_CHARACTER_MUTATION,
  DELETE_CHARACTER_MUTATION,
  FETCH_CHARACTERS_QUERY,
  UPDATE_CHARACTER_MUTATION
} from './characters'
export {
  CREATE_GAME_QUERY,
  END_GAME,
  FETCH_GAMES_QUERY,
  FETCH_GAME_QUERY,
  LEAVE_GAME,
  NEW_GAME_SUBSCRIPTION,
  PARTICIPATE_GAME,
  FETCH_HOSTED_GAMES_QUERY,
} from './games'

export const FETCH_USERS_QUERY = gql`
  query Users($username: String!) {
    users(username: $username){
      id
      firstName
      lastName
      username
      avatar
      roles {
        name
        id
      }
    }
  }
`

export const FETCH_ROLES_QUERY = gql`
  {
    roles {
      id
      name
    }
  }
`

export const FETCH_FACTIONS_QUERY = gql`
  {
    factions {
      id
      name
      logo
    }
  }
`

export const HEALTH_CHECK_QUERY = gql`
  {
    healthCheck
  }
`

export const UPDATE_USER_ROLES = gql`
  mutation UpdateUserRoles($userId: ID!, $roles: [String]!){
    updateUserRoles(userId: $userId, roles: $roles) {
      roles {
        id
        name
      }
    }
  }
`

export const SIGN_IN_MUTATION = gql`
  mutation SignIn(
    $id: ID!
    $firstName: String!
    $lastName: String
    $username: String!
    $hash: String!
    $avatar: String
    $authDate: String!
  ) {
    signIn(
      id: $id,
      firstName: $firstName,
      lastName: $lastName,
      username: $username,
      hash: $hash,
      avatar: $avatar
      authDate: $authDate
    )
  }
`
