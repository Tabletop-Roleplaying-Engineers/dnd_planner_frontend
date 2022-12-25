import { USERS } from '../../fixtures/users'

export function login(user = USERS.simpleUser) {
  return cy
    .request({
      method: 'POST',
      url: `${Cypress.env('API_URL')}/test-auth`,
      body: {
        user: {
          ...user,
          id: user.outerId,
        },
      },
    })
    .its('body')
    .then((body) => {
      window.localStorage.setItem('AUTH_DATA', body)
    })
}

export function loginAs(user) {
  cy.login(user)
  cy.addRoles(user.id, user.roles || [])
  cy.login(user)
}

export function addRoles(userId: string, roles: string[]) {
  const data = {
    userId,
    roles,
  }
  cy.request({
    url: `${Cypress.env('API_URL')}/addRoles`,
    method: 'POST',
    body: data,
  })
}
