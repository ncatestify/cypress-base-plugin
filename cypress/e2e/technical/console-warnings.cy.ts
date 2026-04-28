describe('Technical Tests - Console Warnings', () => {
  it('No console warnings on page', () => {
    cy.visit('/')
    cy.ttCheckConsoleWarnings()
  })
})
