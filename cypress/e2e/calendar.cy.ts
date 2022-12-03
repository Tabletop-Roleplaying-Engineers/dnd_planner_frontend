import { USERS } from '../fixtures/users'
import { calendarDriver } from '../support/drivers/calendar'
import { defaultGame } from '../fixtures/games'
import { defaultCharacter } from '../fixtures/characters'
import { Game } from '../../src/types/game'
import { Faction } from '../../src/types/faction'
import { Character } from '../../src/types/character'

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

  // it('user should be able to create game', function () {
  //   const date = new Date('Nov 10 2020 16:42:57 GMT+0200')
  //   cy.clock(date.getTime())
  //   cy.loginAs(USERS.gameMaster)
  //   cy.visit('/calendar')

  //   cy.getByTestId('calendar-spinner').should('not.be.visible')
  //   cy.tick(1000)

  //   // I want to click on 16-th cell of calendar (it is 11th of November 2020)
  //   cy.getByTestId('calendar-cell').eq(16).click()
  //   cy.getByTestId('create-game-btn').click()

  //   const file = 'image.jpg'
  //   page.attachFileToUploadField('image-field-wrapper', file)

  //   cy.getByTestId('title-field').type('Game title')

  //   page.selectPlayersCount(3)

  //   cy.getByTestId('description-field').type('description')

  //   cy.getByTestId('submit-btn').click()

  //   cy.waitUntil(() => cy.getByTestId('game-form').should('not.be.visible'))
  // })

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
