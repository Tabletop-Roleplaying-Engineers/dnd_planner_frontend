import { USERS } from '../fixtures/users'
import { defaultGame } from '../fixtures/games'
import { Game } from '../../src/types/game'
import { defaultCharacter } from '../fixtures/characters'
import { Character } from '../../src/types/character'
import { calendarDriver } from '../support/drivers/calendar'
import { gameDriver } from '../support/drivers/game'

describe('Games', function () {
  let character: Character
  let game: Game
  before(function () {
    cy.seedDefaultData()
    cy.login(USERS.simpleUser)
    cy.getFactions().then((factions) => {
      cy.createCharacter(defaultCharacter({ faction: factions[0].id })).then(
        (c) => {
          character = c
        },
      )
    })

    cy.login(USERS.gameMaster)
    cy.createGame(defaultGame()).then((g) => {
      game = g
    })
  })
  beforeEach(function () {
    cy.login(USERS.simpleUser)
    cy.addParticipantToGame(game.id, character.id)
  })

  it('game master should be able to remove participants from his game', function () {
    cy.login(USERS.gameMaster)

    cy.visit('/calendar')

    calendarDriver.openGame(game.title)

    calendarDriver.getCharacterLink(character.name).should('exist')
    gameDriver.removeCharacterParticipation()
    calendarDriver.getCharacterLink(character.name).should('not.exist')
  })
  it('administrator should be able to remove participants from his game', function () {
    cy.login(USERS.administrator)

    cy.visit('/calendar')

    calendarDriver.openGame(game.title)

    calendarDriver.getCharacterLink(character.name).should('exist')
    gameDriver.removeCharacterParticipation()
    calendarDriver.getCharacterLink(character.name).should('not.exist')
  })
})
