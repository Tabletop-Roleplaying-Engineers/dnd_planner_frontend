import { USERS } from '../users'

const page = {
  attachFileToUploadField: (id, fileName) =>
    cy.getByTestId(id).within(() => {
      cy.get('input').attachFile(fileName)
    }),
  selectPlayersCount: (number) => {
    cy.getByTestId('select-players').click()

    return cy.getByTestId(`select-option-players-${number}`).click()
  },
}

describe('Calendar', function () {
  it.skip('user should be able to participate the game', function () {
    // const name = `charName-${Date.now()}`
    // cy.login(USERS.simpleUser)
    cy.addRoles(USERS.simpleUser.id, ['GameMaster'])
    cy.createGame()
    cy.visit('/calendar')

    // // Create
    // page.getAddCharacterBtn().click()
    // page.getNameInput().type(name)
    // page.selectFractionByIndex(0)
    // page.selectClassByIndex(0)
    // page.getAvatarInput().type('avatar/url')
    // page.getSaveBtn().click()

    // page.getCharacterPanelByName(name).should('be.visible')

    // // Edit
    // page.clickCharacterMenuItem(name, 'character-menu-edit')
    // page.selectFractionByIndex(1)
    // page.selectClassByIndex(1)
    // page.getAvatarInput().type('avatar/ur2l')
    // page.getSaveBtn().click()

    // page.getCharacterPanelByName(name).should('be.visible')

    // // Delete
    // page.clickCharacterMenuItem(name, 'character-menu-delete')

    // page.getCharacterPanelByName(name).should('not.exist')
  })

  it('user should be able to create game', function () {
    const date = new Date('Nov 10 2020 16:42:57 GMT+0200')
    cy.clock(date.getTime())
    cy.loginAs(USERS.gameMaster)
    cy.visit('/calendar')

    cy.getByTestId('calendar-spinner').should('not.be.visible')
    cy.tick(1000)

    // I want to click on 16-th cell of calendar (it is 11th of November 2020)
    cy.getByTestId('calendar-cell').eq(16).click()
    cy.getByTestId('create-game-btn').click()

    const file = 'image.jpg'
    page.attachFileToUploadField('image-field-wrapper', file)

    cy.getByTestId('title-field').type('Game title')

    page.selectPlayersCount(3)

    cy.getByTestId('description-field').type('description')

    cy.getByTestId('submit-btn').click()

    cy.waitUntil(() => cy.getByTestId('game-form').should('not.be.visible'))
  })

  it('telegram notifications should be sent only in case `share` prop is `true`', function () {
    const date = new Date('Nov 10 2020 16:42:57 GMT+0200')
    cy.clock(date.getTime())
    cy.loginAs(USERS.gameMaster)
    cy.request({
      method: 'GET',
      url: `${Cypress.env('API_URL')}/sharing-items`,
    })
      .its('body.length')
      .as('firstNotificationCount')

    cy.createGame({
      share: false,
    })
    cy.request({
      method: 'GET',
      url: `${Cypress.env('API_URL')}/sharing-items`,
    })
      .its('body.length')
      .then((v) => {
        cy.get('@firstNotificationCount').should('equal', v)
      })

    cy.createGame({
      share: true,
    })
    cy.request({
      method: 'GET',
      url: `${Cypress.env('API_URL')}/sharing-items`,
    })
      .its('body.length')
      .then((v) => {
        cy.get('@firstNotificationCount')
          .then((count) => count + 1)
          .should('equal', v)
      })
  })
})
