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
    cy.getFactions().as('factions')
  })
  beforeEach(function () {
    cy.login(USERS.gameMaster)
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
    // After reloading the game already opened

    cy.get<Character>('@character').then((character) => {
      calendarDriver.getCharacterLink(character.name).should('exist')
    })
  })

  it('user should be able to create game', function () {
    cy.visit('/calendar')

    cy.findByText('Game title').should('not.exist')

    calendarDriver.getNextPeriodBtn().click()
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

  // TODO: this is an API test. Move it i]to the backend
  it.skip('telegram notifications should be sent only in case `share` prop is `true`', function () {
    cy.visit('/calendar')

    cy.getSharingNotifications()
      .its('body.length')
      .then((initialCount) => {
        cy.createGame(
          defaultGame({
            share: false,
          }),
        )
        cy.getSharingNotifications()
          .its('body.length')
          .should('equal', initialCount)

        cy.createGame(
          defaultGame({
            share: true,
          }),
        )
        cy.getSharingNotifications()
          .its('body.length')
          .should('equal', initialCount + 1)
      })
  })
})
