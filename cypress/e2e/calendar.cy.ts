import { USERS } from '../fixtures/users'
import { calendarDriver } from '../support/drivers/calendar'
import { defaultGame } from '../fixtures/games'
import { defaultCharacter } from '../fixtures/characters'
import { Game } from '../../src/types/game'
import { Faction } from '../../src/types/faction'
import { Character } from '../../src/types/character'
import { UA } from '../support/intl'

describe('Calendar', function () {
  before(function () {
    cy.seedDefaultData()
    cy.login(USERS.gameMaster)
    cy.getFactions().as('factions')
  })

  it('user should be able to participate the game', function () {
    cy.createGame(defaultGame()).as('game')
    cy.login(USERS.simpleUser)
    cy.get<Faction[]>('@factions').then((factions) => {
      cy.createCharacter(defaultCharacter({ faction: factions[0].id })).as(
        'character',
      )
    })
    cy.visit('/calendar')

    cy.get<Game>(`@game`).then((game) => {
      calendarDriver.openGame(game.title)
    })

    calendarDriver.openCharacterList()
    calendarDriver.ensureCharacterListIsNotEmpty()
    cy.get<Character>('@character').then((character) => {
      calendarDriver.selectCharacterToParticipate(character.name)
    })
    calendarDriver.submitParticipationForm()
    calendarDriver.getParticipationSuccessfulMessage()

    cy.reload()

    cy.get<Character>('@character').then((character) => {
      calendarDriver.getCharacterLink(character.name)
    })
  })

  it.only('user should be able to create game', function () {
    cy.visit('/calendar')

    cy.findByText('Game title').should('not.exist')

    cy.findByText('15').click()
    cy.findByRole('button', {
      name: new RegExp(UA.gameList.createGame),
    }).click()

    const file = 'cypress/fixtures/image140x100.png'
    calendarDriver.gameForm.attachFileToUploadField('image-field-wrapper', file)
    cy.findByPlaceholderText(UA.gameForm.namePlaceholder).type('Game title')
    calendarDriver.gameForm.selectPlayersCount(3)
    calendarDriver.gameForm.getDescription().type('description')
    calendarDriver.gameForm.getSubmitBtn().click()

    cy.findByText(UA.gameForm.successMessage)
    calendarDriver.gameForm.getHeader().should('not.exist')
    cy.findByText('Game title').should('exist')
  })

  // it('telegram notifications should be sent only in case `share` prop is `true`', function () {
  //   const date = new Date('Nov 10 2020 16:42:57 GMT+0200')
  //   cy.clock(date.getTime())
  //   cy.loginAs(USERS.gameMaster)
  //   cy.request({
  //     method: 'GET',
  //     url: `${Cypress.env('API_URL')}/sharing-items`,
  //   })
  //     .its('body.length')
  //     .as('firstNotificationCount')

  //   cy.createGame({
  //     share: false,
  //   })
  //   cy.request({
  //     method: 'GET',
  //     url: `${Cypress.env('API_URL')}/sharing-items`,
  //   })
  //     .its('body.length')
  //     .then((v) => {
  //       cy.get('@firstNotificationCount').should('equal', v)
  //     })

  //   cy.createGame({
  //     share: true,
  //   })
  //   cy.request({
  //     method: 'GET',
  //     url: `${Cypress.env('API_URL')}/sharing-items`,
  //   })
  //     .its('body.length')
  //     .then((v) => {
  //       cy.get('@firstNotificationCount')
  //         .then((count) => count + 1)
  //         .should('equal', v)
  //     })
  // })
})
