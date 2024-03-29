import gql from 'graphql-tag'

export {
  AVAILABLE_CHARACTERS,
  CREATE_CHARACTER_MUTATION,
  DELETE_CHARACTER_MUTATION,
  FETCH_CHARACTERS_QUERY,
  UPDATE_CHARACTER_MUTATION,
  REMOVE_CHARACTER_FROM_GAME_MUTATION,
} from './characters'
export {
  CREATE_GAME_QUERY,
  DELETE_GAME,
  FETCH_GAMES_QUERY,
  FETCH_GAME_QUERY,
  LEAVE_GAME,
  NEW_GAME_SUBSCRIPTION,
  PARTICIPATE_GAME,
  FETCH_HOSTED_GAMES_QUERY,
  FETCH_GAMES_USER_PLAY_QUERY,
  UPDATE_GAME_QUERY,
  SEARCH_GAMES,
} from './games'

export { FETCH_RULES } from './rules'

export const FETCH_USERS_QUERY = gql`
  query Users($username: String, $role: String) {
    users(username: $username, role: $role) {
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

export const CURRENT_USER = gql`
  {
    currentUser {
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
  mutation UpdateUserRoles($userId: ID!, $roles: [String]!) {
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
      id: $id
      firstName: $firstName
      lastName: $lastName
      username: $username
      hash: $hash
      avatar: $avatar
      authDate: $authDate
    )
  }
`

export const REFRESH_TOKEN = gql`
  mutation RefreshToken($token: String!) {
    refreshToken(token: $token)
  }
`

export const SIGN_IN_ON_BEHALF_MUTATION = gql`
  mutation SignInOnBehalf($userId: ID!) {
    signInOnBehalf(userId: $userId)
  }
`
