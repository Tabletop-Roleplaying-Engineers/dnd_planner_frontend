const getByTestId = (id) => cy.get(`[data-testid=${id}]`)
const page = {
  getAddCharacterBtn: () => getByTestId('add-character-btn'),
  getNameInput: () => getByTestId('input-name'),
  selectFractionByIndex: (i) => {
    getByTestId('select-faction').click()
    return cy.get('[data-testid*=select-option-faction-]').eq(i).click()
  },
  selectClassByIndex: (i) => {
    getByTestId('select-class').click()
    cy.get('[data-testid*=select-option-class-]').eq(i).click()
    // Class select doesn't close automatically
    return cy.get('.ant-select-search__field').type('{esc}')
  },
  getAvatarInput: () => getByTestId('input-avatar'),
  getSaveBtn: () => getByTestId('save-btn'),
  getCharacterPanelByName: (name) => getByTestId(`character-${name}`),
  clickCharacterMenuItem: (charName, itemId) => {
    page.getCharacterPanelByName(charName).find('[data-testid=character-menu]').click()
    getByTestId(itemId).click()
  },
}

describe('Characters', function () {
  it('user should be able to create, edit and remove character', function () {
    const name = `charName-${Date.now()}`
    cy.login()
    cy.visit('/profile')

    // Create
    page.getAddCharacterBtn().click()
    page.getNameInput().type(name)
    page.selectFractionByIndex(0)
    page.selectClassByIndex(0)
    page.getAvatarInput().type('avatar/url')
    page.getSaveBtn().click()

    page.getCharacterPanelByName(name).should('be.visible')

    // Edit
    page.clickCharacterMenuItem(name, 'character-menu-edit')
    page.selectFractionByIndex(1)
    page.selectClassByIndex(1)
    page.getAvatarInput().type('avatar/ur2l')
    page.getSaveBtn().click()

    page.getCharacterPanelByName(name).should('be.visible')

    // Delete
    page.clickCharacterMenuItem(name, 'character-menu-delete')

    page.getCharacterPanelByName(name).should('not.exist')
  })
})
