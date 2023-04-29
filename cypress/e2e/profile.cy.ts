import { Character } from '../../src/types/character'
import { defaultCharacter } from '../fixtures/characters'
import { profileDriver } from '../support/drivers/profile'

const avatarUrl = 'static/media/logoBig.aed85e685aceb8a157b7.png'

describe('Characters', function () {
  let name: string
  beforeEach(() => {
    name = `charName-${Date.now()}`
    cy.login()

    cy.getFactions().then((factions) => {
      cy.createCharacter(
        defaultCharacter({ faction: factions[0].id, name }),
      ).as('character')
    })
  })
  afterEach(() => {
    cy.fetchCharacters().then((list) => {
      return list.data.characters.forEach((c) => {
        return cy.removeCharacter(c.id)
      })
    })
  })

  it('user should be able to create', function () {
    cy.visit('/profile')

    profileDriver.openCharactersTab()

    profileDriver.getAddCharacterBtn().click()
    profileDriver.getNameInput().type(`charName-${Date.now()}`)
    profileDriver.selectFractionByIndex(0)
    profileDriver.selectClassByIndex(0)
    cy.url().then((str) => {
      const url = new URL(str)
      const imgUrl = `${url.origin}/${avatarUrl}`
      profileDriver.getAvatarInput().type(imgUrl)
    })
    cy.findByTestId('preview-avatar')
    cy.findByTestId('preview-avatar').its('0.complete').should('be.true')
    profileDriver.getSaveBtn().click()

    cy.findByText('Персонаж створений').should('exist')
    profileDriver.getCharacterPanelByName(name).should('be.visible')
  })
  it('user should be able to edit character', function () {
    cy.visit('/profile')

    profileDriver.openCharactersTab()

    cy.get<Character>('@character').then((character) => {
      profileDriver.getCharacterMenu(character.name).click()
    })
    cy.findByText('Редагувати').click()
    profileDriver.selectFractionByIndex(1)
    profileDriver.selectClassByIndex(1)
    cy.url().then((str) => {
      const url = new URL(str)
      const imgUrl = `${url.origin}/${avatarUrl}`
      profileDriver.getAvatarInput().clear().type(imgUrl)
    })
    profileDriver.getSaveBtn().click()

    cy.get<Character>('@character').then((character) => {
      profileDriver.getCharacterPanelByName(character.name).should('be.visible')
    })
  })
  it('user should be able to remove character', function () {
    cy.visit('/profile')
    profileDriver.openCharactersTab()

    cy.get<Character>('@character').then((character) => {
      profileDriver.getCharacterMenu(character.name).click()
    })
    cy.findByText('Видалити').click()
    cy.findByRole('button', { name: 'Так' }).click()
    profileDriver.getCharacterPanelByName(name).should('not.exist')
  })
})
