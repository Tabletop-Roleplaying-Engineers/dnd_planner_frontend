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

import '@testing-library/cypress/add-commands'
import { addRoles, login, loginAs } from './commands/auth'
import { createCharacter } from './commands/character'
import { getFactions } from './commands/factions'
import { createGame, getSharingNotifications } from './commands/game'
import { defaultSeeding } from './commands/seeding'

declare global {
  namespace Cypress {
    interface Chainable {
      login: typeof login
      loginAs: typeof loginAs
      addRoles: typeof addRoles
      createGame: typeof createGame
      seedDefaultData: typeof defaultSeeding
      createCharacter: typeof createCharacter
      getFactions: typeof getFactions
      getSharingNotifications: typeof getSharingNotifications
    }
  }
}

Cypress.Commands.add('seedDefaultData', defaultSeeding)
Cypress.Commands.add('createGame', createGame)
Cypress.Commands.add('createCharacter', createCharacter)
Cypress.Commands.add('getFactions', getFactions)
Cypress.Commands.add('getSharingNotifications', getSharingNotifications)
Cypress.Commands.add('addRoles', addRoles)
Cypress.Commands.add('login', login)
Cypress.Commands.add('loginAs', (user) => {
  cy.login(user)
  cy.addRoles(user.id, user.roles || [])
  cy.login(user)
})
// Cypress.Commands.add('getByTestId', (testId) => {
//   cy.get(`[data-testid=${testId}]`)
// })
