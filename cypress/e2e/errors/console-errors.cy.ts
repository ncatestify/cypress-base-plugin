describe('Console Error Tests', () => {
  it('Detects no errors on a clean page', () => {
    cy.visit('/')
    cy.ttSetupConsoleErrorListener()
  })

  it('Detects console, runtime, resource and network errors', (done) => {
    cy.once('fail', (err: Error) => {
      expect(err.message).to.contain('Errors detected')
      expect(err.message).to.contain('console.error: Error Seite: console.error')
      expect(err.message).to.contain('Error Seite: runtime error')
      expect(err.message).to.contain('Resource error: SCRIPT')
      expect(err.message).to.contain('Network error: 404')
      done()
    })

    cy.visit('/console-errors/')
    cy.ttSetupConsoleErrorListener()
  })

  it('Detects missing css files', (done) => {
    cy.once('fail', (err: Error) => {
      expect(err.message).to.contain('Errors detected')
      expect(err.message).to.contain('Network error: 404')
      done()
    })

    cy.visit('/css-file-not-loading/')
    cy.ttSetupConsoleErrorListener()
  })
})
