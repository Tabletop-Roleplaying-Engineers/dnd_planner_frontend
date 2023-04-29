import { USERS } from '../../fixtures/users'

export function defaultSeeding() {
  return cy.request({
    url: `${Cypress.env('API_URL')}/seeding`,
    method: 'POST',
    body: {
      users: [USERS.simpleUser, USERS.gameMaster, USERS.administrator],
    },
  })
}
