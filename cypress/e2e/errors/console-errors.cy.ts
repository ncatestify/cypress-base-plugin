describe('Console Error Tests', () => {
  it('Set up console error listener', () => {
    cy.visit('/console-errors/')
    cy.ttSetupConsoleErrorListener()
  })

  it('Check if multiple css files are missing', () => {
    cy.visit('/css-file-not-loading/')
    cy.ttSetupConsoleErrorListener()
  })
})
