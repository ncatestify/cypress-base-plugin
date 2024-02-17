export const ttSetupConsoleErrorListener = () => {
  cy.log('ttSetupConsoleErrorListener - Setup console error listener')
  cy.on('uncaught:exception', (err, runnable) => {
    expect(err.message).to.include('expected error message')
    return false
  })
}
