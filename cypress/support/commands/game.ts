import { GameForm, Game } from '../../../src/types/game'
import { CREATE_GAME_QUERY } from '../../../src/api'
import { gqlRequest } from './gqlRequest'

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
