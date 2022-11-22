describe('Calendar', function () {
  it('should show games', function () {
    cy.visit('http://localhost/calendar')
    cy.contains('SW EofE').click()

    cy.get(':nth-child(2) > .sc-hMqMXs > .ant-card > .ant-card-body > :nth-child(1) > .ant-row > :nth-child(2) > :nth-child(1) > a > .sc-htoDjs')

    // expect(true).to.equal(true)
  })
})
