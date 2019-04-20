import gql from 'graphql-tag'

export const FETCH_GAMES_QUERY = gql`
  {
    games {
      id
      title
      image
      description
      startingDate
      startingTime
      range
      players
      characters {
        id
        name
        experience
        renown
        faction {
          id
          name
          logo
        }
      },
    }
  }
`

export const CREATE_GAME_QUERY = gql`
  mutation CreateGame(
  $title: String!
  $image: String!
  $description: String!
  $startingDate: String!
  $startingTime: String!
  $range: [Int!]!,
  $players: Int!,
  ){
    createGame(
      title: $title
      image: $image
      description: $description
      startingDate: $startingDate
      startingTime: $startingTime
      range: $range
      players: $players,
    ) {
      id
      title
      image
      description
      startingDate
      startingTime
      range
      players,
      characters {
        id,
        name,
        experience,
        renown
        faction {
          id
          name
          logo
        }
      },
    }
  }
`

export const FETCH_CHARACTERS_QUERY = gql`
  {
    characters{
      id
      name
      experience
      renown
      faction {
        id
        name
        logo
      }
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

export const CREATE_CHARACTER_MUTATION = gql`
  mutation CreateCharacter(
  $name: String!
  $faction: ID!
  ) {
    createCharacter(name: $name, faction: $faction) {
      id
      name
      experience
      renown
      faction {
        id
        name
        logo
      }
    }
  }
`

export const DELETE_CHARACTER_MUTATION = gql`
  mutation DeleteCharacter($id: ID!){
    deleteCharacter(id: $id) {
      id
    }
  }
`

export const NEW_GAME_SUBSCRIPTION = gql`
  subscription {
    newGame {
      id
      title
      image
      description
      startingDate
      startingTime
      range
      players
      characters {
        id
        name
        experience
        renown
        faction {
          id
          name
          logo
        }
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
    ) {
      id
      firstName
      lastName
      username
      avatar
    }
  }
`

export const SIGN_UP_MUTATION = gql`
  mutation SignUp(
    $id: ID!
    $firstName: String!
    $lastName: String!
    $username: String!
    $avatar: String!
  ) {
    signUp(id: $id, firstName: $firstName, lastName: $lastName, username: $username, avatar: $avatar) {
      id
      firstName
      lastName
      username
      avatar
    }
  }
`