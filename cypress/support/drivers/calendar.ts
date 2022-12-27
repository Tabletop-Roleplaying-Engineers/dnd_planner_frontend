import { UA } from '../intl'

export const calendarDriver = {
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
    return cy.findByRole('link', { name: new RegExp(name, 'i') })
  },
  gameForm: {
    getHeader() {
      return cy.findByRole('heading', { name: UA.gameForm.header })
    },
    attachFileToUploadField: (id, fileName) =>
      cy.findByTestId(id).within(() => {
        // Need to force event because this file selector
        // is virtual and the real input is hidden
        cy.get('input').selectFile(fileName, { force: true })
      }),
    selectPlayersCount: (number) => {
      cy.findByRole('combobox').click()
      cy.findByTitle(number).click()
    },
    getDescription() {
      return cy.findByPlaceholderText(UA.gameForm.descriptionPlaceholder)
    },
    getSubmitBtn() {
      return cy.findByRole('button', {
        name: new RegExp(UA.gameForm.submit, 'i'),
      })
    },
  },
  getNextPeriodBtn() {
    return cy.findByRole('button', { name: UA.controls.next })
  },
}
