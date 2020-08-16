import gql from 'graphql-tag'

const userFragment = `
user {
  id
  firstName
  lastName
  avatar
  username
}
`
export const AVAILABLE_CHARACTERS = gql`
  query AvailableCharacters($gameId: ID!) {
    validCharactersForGame(gameId: $gameId) {
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
      ${userFragment}
    }
  }
`

export const FETCH_CHARACTERS_QUERY = gql`
  {
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
      games {
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

export const CREATE_CHARACTER_MUTATION = gql`
  mutation CreateCharacter(
    $name: String!
    $faction: ID!
    $class: String!
    $avatar: String!
  ) {
    createCharacter(
      name: $name
      faction: $faction
      class: $class
      avatar: $avatar
    ) {
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
  mutation DeleteCharacter($id: ID!) {
    deleteCharacter(id: $id)
  }
`

export const REMOVE_CHARACTER_FROM_GAME_MUTATION = gql`
  mutation RemoveCharacterFromGame($characterId: ID!, $gameId: ID!) {
    removeCharacterFromGame(characterId: $characterId, gameId: $gameId)
  }
`

export const UPDATE_CHARACTER_MUTATION = gql`
  mutation UpdateCharacter(
    $id: ID!
    $faction: ID!
    $class: String!
    $avatar: String!
  ) {
    updateCharacter(
      id: $id
      faction: $faction
      class: $class
      avatar: $avatar
    ) {
      id
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
