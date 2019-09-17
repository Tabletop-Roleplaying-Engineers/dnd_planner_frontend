import gql from 'graphql-tag'

export const FETCH_GAMES_QUERY = gql`
  {
    games {
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
      status
      user {
        firstName
        lastName
        avatar
        username
      }
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
      class
      avatar
      experience
      renown
      faction {
        id
        name
        logo
      }
      game {
        id
        title
        image
        description
        startingDate
        lvlFrom
        lvlTo
      }
    }
  }
`

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

export const CREATE_CHARACTER_MUTATION = gql`
  mutation CreateCharacter(
  $name: String!
  $faction: ID!
  $class: String!
  $avatar: String!
  ) {
    createCharacter(name: $name, faction: $faction, class: $class, avatar: $avatar) {
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

export const AVAILABLE_CHARACTERS = gql`
  query AvailableCharacters($gameId: ID!) {
    validCharactersForGame(gameId: $gameId){
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
