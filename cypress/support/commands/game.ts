import { GameForm, Game } from '../../../src/types/game'
import { CREATE_GAME_QUERY, PARTICIPATE_GAME } from '../../../src/api'
import { apolloClient, gqlRequest } from './gqlRequest'

export function createGame(game: GameForm) {
  const data = {
    operationName: 'CreateGame',
    variables: game,
    query: CREATE_GAME_QUERY,
  }

  return gqlRequest<{ createGame: Game }>(data).its('createGame')
}

export function getSharingNotifications() {
  return cy.request({
    method: 'GET',
    url: `${Cypress.env('API_URL')}/sharing-items`,
  })
}

export function addParticipantToGame(gameId: string, characterId: string) {
  return apolloClient.mutate({
    mutation: PARTICIPATE_GAME,
    variables: {
      gameId: gameId,
      characterId: characterId,
    },
  })
}
