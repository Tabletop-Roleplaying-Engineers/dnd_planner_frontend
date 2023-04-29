import {
  CREATE_CHARACTER_MUTATION,
  DELETE_CHARACTER_MUTATION,
  FETCH_CHARACTERS_QUERY,
} from '../../../src/api'
import { CharacterForm, Character } from '../../../src/types/character'
import { apolloClient, gqlRequest } from './gqlRequest'

export function createCharacter(data: CharacterForm) {
  return gqlRequest<{ createCharacter: Character }>({
    operationName: 'CreateCharacter',
    variables: data,
    query: CREATE_CHARACTER_MUTATION,
  }).its('createCharacter')
}

export function removeCharacter(id: string) {
  return apolloClient.mutate({
    mutation: DELETE_CHARACTER_MUTATION,
    variables: { id: id },
  })
}

export function fetchCharacters() {
  return apolloClient.query<{ characters: Character[] }>({
    query: FETCH_CHARACTERS_QUERY,
    fetchPolicy: 'network-only',
  })
}
