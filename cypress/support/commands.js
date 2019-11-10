// ***********************************************
// This example commands.js shows you how to
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
Cypress.Commands.add("login", (email, password) => {
  const authData = {
    first_name: 'first_name',
    last_name: 'last_name',
    photo_url: 'photo_url',
    id: 'id',
    username: 'username',
    auth_date: 'auth_date',
    hash: 'hash',
  }
  const params = Object.keys(authData).map((key) => `${key}=${authData[key]}`).join('&')

  cy.visit(`/login?${params}`)
  cy.get('[data-testid=profile-drop-menu]').should('be.visible')
})
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
