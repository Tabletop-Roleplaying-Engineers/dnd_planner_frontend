import gql from 'graphql-tag'

const gameFields = `
  id
  title
  image
  description
  startingDate
  lvlFrom
  lvlTo
  players
  tags
  characters {
    id
    name
    experience
    renown
    avatar
    class
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
  query Games($from: String!, $to: String!) {
    games(from: $from, to: $to) {
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

export const FETCH_HOSTED_GAMES_QUERY = gql`
  query HostedGames($userId: ID!) {
    gamesWithDM(userId: $userId){
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
    $lvlFrom: Int!
    $lvlTo: Int!
    $players: Int!
    $telegramPost: Boolean!
    $facebookPost: Boolean!
    $tags: [String]!
    $userId: String
  ) {
    createGame(
      title: $title
      image: $image
      description: $description
      startingDate: $startingDate
      lvlFrom: $lvlFrom
      lvlTo: $lvlTo
      players: $players
      telegramPost: $telegramPost
      facebookPost: $facebookPost
      tags: $tags
      userId: $userId
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
      tags
      characters {
        id
        name
        experience
        renown
        avatar
        faction {
          id
          name
          logo
        }
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
`

export const PARTICIPATE_GAME = gql`
  mutation ParticipateGame($gameId: ID!, $characterId: ID!) {
    participateGame(gameId: $gameId, characterId: $characterId) {
      id
      players
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
  mutation LeaveGame($characterId: ID!, $gameId: ID!) {
    leaveGame(characterId: $characterId, gameId: $gameId) {
      id
      games {
        id
      }
    }
  }
`

export const DELETE_GAME = gql`
  mutation DeleteGame($id: ID!) {
    deleteGame(id: $id) {
      id
      title
    }
  }
`

export const UPDATE_GAME_QUERY = gql`
  mutation UpdateGame(
    $id: ID!
    $title: String!
    $image: String!
    $description: String!
    $startingDate: String!
    $lvlFrom: Int!
    $lvlTo: Int!
    $players: Int!
    $tags: [String]!
    $telegramPost: Boolean!
    $facebookPost: Boolean!
    $userId: String
  ) {
    editGame(
      id: $id
      title: $title
      image: $image
      description: $description
      startingDate: $startingDate
      lvlFrom: $lvlFrom
      lvlTo: $lvlTo
      players: $players
      tags: $tags
      telegramPost: $telegramPost
      facebookPost: $facebookPost
      userId: $userId
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

export const FETCH_GAMES_USER_PLAY_QUERY = gql`
  query GamesUserPlay($includeOld: Boolean) {
    gamesUserPlay(includeOld: $includeOld){
      ${gameFields}
    }
  }
`

export const SEARCH_GAMES = gql`
  query gamesSearch($userId: String, $title: String, $tag: String) {
    gamesSearch(userId: $userId, title: $title, tag: $tag) {
      ${gameFields}
    }
  }
`

export const USERS_WHO_CREATED_GAMES = gql`
  {
    usersWhoCreatedGames {
      id
      avatar
      firstName
      lastName
      username
    }
  }
`
