import { CREATE_CHARACTER_MUTATION } from '../../../src/api'
import { CharacterForm, Character } from '../../../src/types/character'
import { gqlRequest } from './gqlRequest'

export function createCharacter(data: CharacterForm) {
  return gqlRequest<{ createCharacter: Character }>({
    operationName: 'CreateCharacter',
    variables: data,
    query: CREATE_CHARACTER_MUTATION,
  }).its('createCharacter')
}
