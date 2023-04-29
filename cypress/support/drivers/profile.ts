import { UA } from '../intl'

export const profileDriver = {
  getAddCharacterBtn: () => cy.findByTestId('add-character-btn'),
  getNameInput: () => cy.findByTestId('input-name'),
  selectFractionByIndex: (i) => {
    cy.findByTestId('select-faction').click()

    return cy.get('[data-testid*=select-option-faction-]').eq(i).click()
  },
  selectClassByIndex: (i) => {
    cy.findByTestId('select-class').click()
    cy.get('[data-testid*=select-option-class-]').eq(i).click()
  },
  getAvatarInput: () => cy.findByTestId('input-avatar'),
  getSaveBtn: () => cy.findByTestId('save-btn'),
  getCharacterPanelByName: (name) => cy.findByRole('heading', { name }),
  clickCharacterMenuItem: (charName, itemId) => {
    profileDriver
      .getCharacterPanelByName(charName)
      .closest('a')
      .parent()
      .find('[data-testid=character-menu]')
      .click()
    cy.findByTestId(itemId).click()
  },
  getCharacterMenu: (charName) => {
    return profileDriver
      .getCharacterPanelByName(charName)
      .closest('a')
      .parent()
      .find('[data-testid=character-menu]')
  },
  openCharactersTab: () => {
    cy.findByRole('tab', { name: new RegExp(UA.profile.charactersTab) }).click()
  },
}
