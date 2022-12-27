import { UA } from '../intl'

function getCharacterCornerMenu() {
  return cy.findByTestId('corner-menu')
}
function getRemoveFromCharacterCornerMenu() {
  getCharacterCornerMenu().click()

  return cy.findByText(UA.game.removeChar)
}
export const gameDriver = {
  getCharacterCornerMenu,
  getRemoveFromCharacterCornerMenu,
  removeCharacterParticipation: () => {
    getRemoveFromCharacterCornerMenu().click()
    cy.findByRole('button', { name: UA.common.ok }).click()
  },
}
