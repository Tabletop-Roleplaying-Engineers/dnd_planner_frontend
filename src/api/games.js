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
  status
  tags {
    id
    name
    type
  }
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
  $lvlFrom: Int!,
  $lvlTo: Int!,
  $players: Int!,
  $telegramPost: Boolean!,
  $facebookPost: Boolean!,
  $tags: [ID]!,
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
      tags: $tags,
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
      tags {
        id
        name
        type
      }
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
  mutation ParticipateGame(
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
    endGame(gameId: $gameId) {
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
  $lvlFrom: Int!,
  $lvlTo: Int!,
  $players: Int!,
  $tags: [ID]!,
  $telegramPost: Boolean!,
  $facebookPost: Boolean!,
  ){
    editGame(
      id: $id
      title: $title
      image: $image
      description: $description
      startingDate: $startingDate
      lvlFrom: $lvlFrom
      lvlTo: $lvlTo
      players: $players,
      tags: $tags,
      telegramPost: $telegramPost,
      facebookPost: $facebookPost
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
