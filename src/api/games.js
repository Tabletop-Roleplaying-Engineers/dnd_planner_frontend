import gql from 'graphql-tag'

export {
  AVAILABLE_CHARACTERS,
  CREATE_CHARACTER_MUTATION,
  DELETE_CHARACTER_MUTATION,
  FETCH_CHARACTERS_QUERY,
  UPDATE_CHARACTER_MUTATION
} from './characters'

const gameFields = `
  id
  title
  image
  description
  startingDate
  lvlFrom
  lvlTo
  players
  status
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
    user {
      id
      firstName
      lastName
      avatar
      username
    }
  }
  user {
    id
    firstName
    lastName
    avatar
    username
  }
`
export const FETCH_GAMES_QUERY = gql`
  {
    games {
      ${gameFields}
    }
  }
`

export const FETCH_GAME_QUERY = gql`
  query Game($id: ID!) {
    game(id: $id){
      ${gameFields}
    }
  }
`

export const CREATE_GAME_QUERY = gql`
  mutation CreateGame(
  $title: String!
  $image: String!
  $description: String!
  $startingDate: String!
  $lvlFrom: Int!,
  $lvlTo: Int!,
  $players: Int!,
  $telegramPost: Boolean!,
  $facebookPost: Boolean!,
  $gameForNewbies: Boolean!,
  $isAl: Boolean!,
  ){
    createGame(
      title: $title
      image: $image
      description: $description
      startingDate: $startingDate
      lvlFrom: $lvlFrom
      lvlTo: $lvlTo
      players: $players,
      telegramPost: $telegramPost,
      facebookPost: $facebookPost,
      gameForNewbies: $gameForNewbies,
      isAl: $isAl,
    ) {
      id
      title
      image
      description
      startingDate
      lvlFrom
      lvlTo
      players
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

export const NEW_GAME_SUBSCRIPTION = gql`
  subscription {
    newGame {
      id
      title
      image
      description
      startingDate
      lvlFrom
      lvlTo
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
      status
      user {
        id
        firstName
        lastName
        avatar
        username
      }
    }
  }
`

export const PARTICIPATE_GAME = gql`
  mutation SignIn(
    $gameId: ID!
    $characterId: ID!
  ) {
    participateGame(
      gameId: $gameId
      characterId: $characterId
    ) {
      id
      players
      status
      characters {
        id
        name
        class
        avatar
        experience
        renown
        faction {
          id
          name
          logo
        }
        user {
          id
          firstName
          lastName
          avatar
          username
        }
      }
    }
  }
`

export const LEAVE_GAME = gql`
  mutation LeaveGame(
    $characterId: ID!
  ){
    leaveGame(characterId: $characterId){
      id,
      game {
        id
      }
    }
  }
`

export const END_GAME = gql`
  mutation EndGame(
    $gameId: ID!
  ){
    endGame(gameId: $gameId)
  }
`
