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