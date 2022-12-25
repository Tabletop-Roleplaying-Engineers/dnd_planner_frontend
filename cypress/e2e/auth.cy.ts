describe('Authentication', function () {
  it('user should be able to login', function () {
    cy.visit('/')
    cy.get('[data-testid=login-btn]').click()
    cy.get('[data-testid=profile-drop-menu]').should('be.visible')
  })
})
