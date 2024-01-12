export const ttNoConsoleErrors = (): void => {
  cy.log('ttNoConsoleErrors - NCA TESTIFY')
  Cypress.on('window:before:load', (win) => {
    const windowErrorSpy = cy.spy(win.console, 'error');
    expect(windowErrorSpy).to.not.be.called
  })
}
