import { CREATE_GAME_QUERY } from '../../src/api/games';
import { USERS } from '../users';

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
Cypress.Commands.add('login', (user = USERS.simpleUser) => {
  const params = Object.keys(user).map((key) => `${key}=${user[key]}`).join('&')

  cy.visit(`/login?${params}`)
  cy.get('[data-testid=profile-drop-menu]').should('be.visible')
})
Cypress.Commands.add('createGame', (variables = {}) => {
  const defaultVariables = {
    title: 'Game1',
    image: 'https://i.imgur.com/rYXkmb2.png',
    description: 'description',
    lvlFrom: 1,
    lvlTo: 4,
    players: 4,
    facebookPost: false,
    gameForNewbies: false,
    isAl: false,
    startingDate: (new Date()).toISOString(),
    telegramPost: false,
  }
  const data = {
    "operationName": "CreateGame",
    "variables": {
      ...defaultVariables,
      ...variables,
    },
    "query": CREATE_GAME_QUERY
  }
  const token = localStorage.getItem('AUTH_DATA');
  console.log('=-= token', token)
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
  const token = localStorage.getItem('AUTH_DATA');
  console.log('=-= token', token)
  cy.request({
    url: 'http://localhost:4000/addRoles',
    method: 'POST',
    body: data,
  })
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
