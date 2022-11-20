/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
Cypress.Commands.add('createGame', (variables = {}) => {
  const date = new Date()
  date.setHours(new Date().getHours() + 1)

  const defaultVariables = {
    title: 'Game1',
    image: 'https://via.placeholder.com/150',
    description: 'description',
    lvlFrom: 1,
    lvlTo: 4,
    players: 4,
    facebookPost: false,
    gameForNewbies: false,
    isAl: false,
    startingDate: date.toISOString(),
    share: false,
    tags: [],
  }
  const data = {
    operationName: 'CreateGame',
    variables: {
      ...defaultVariables,
      ...variables,
    },
    query: CREATE_GAME_QUERY,
  }
  const token = localStorage.getItem('AUTH_DATA')
  cy.request({
    url: 'http://localhost:4000/',
    method: 'POST',
    headers: {
      authorization: token,
    },
    body: data,
  })
})
Cypress.Commands.add('addRoles', (userId, roles) => {
  const data = {
    userId,
    roles,
  }
  cy.request({
    url: 'http://localhost:4000/addRoles',
    method: 'POST',
    body: data,
  })
})
Cypress.Commands.add('login', (user = USERS.simpleUser) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('API_URL')}/test-auth`,
    body: {
      user,
    },
  })
    .its('body')
    .then((body) => {
      window.localStorage.setItem('AUTH_DATA', body)
    })
})
Cypress.Commands.add('loginAs', (user) => {
  cy.login(user)
  cy.addRoles(user.id, user.roles || [])
  cy.login(user)
})
Cypress.Commands.add('getByTestId', (testId) => {
  cy.get(`[data-testid=${testId}]`)
})
