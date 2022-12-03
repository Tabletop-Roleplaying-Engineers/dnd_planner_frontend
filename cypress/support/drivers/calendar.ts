import { UA } from '../intl'

export const calendarDriver = {
  attachFileToUploadField: (id, fileName) =>
    cy.findByTestId(id).within(() => {
      cy.get('input').selectFile(fileName)
    }),
  selectPlayersCount: (number) => {
    cy.findByTestId('select-players').click()

    return cy.findByTestId(`select-option-players-${number}`).click()
  },
  openGamesList: (title) => {
    cy.findByRole('heading', { name: title }).should('exist').click()
  },
  openGame: (title) => {
    cy.findByRole('heading', { name: title }).should('exist').click()

    cy.findByRole('dialog')
      .should('exist')
      .within(() => {
        cy.findByRole('link', { name: title }).should('exist').click()
      })
  },
  openCharacterList: () => {
    cy.findByRole('combobox').should('exist').click()
  },
  ensureCharacterListIsNotEmpty: () => {
    cy.findByRole('listbox')
      .should('exist')
      .within(() => {
        cy.findByText(UA.characterSelector_noData).should('not.exist')
      })
  },
  selectCharacterToParticipate: (name) => {
    cy.findByRole('link', { name: new RegExp(name, 'i') })
      .should('exist')
      .parent()
      .click()
  },
  submitParticipationForm: () => {
    cy.findByRole('button', { name: UA.participation.register }).click()
  },
  getParticipationSuccessfulMessage: () => {
    cy.findByText(new RegExp(UA.participation.confirmation, 'i')).should(
      'exist',
    )
  },
  getCharacterLink: (name: string) => {
    cy.findByRole('link', { name: new RegExp(name, 'i') }).should('exist')
  },
}
