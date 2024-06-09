'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ttNoConsoleErrors = void 0
const ttNoConsoleErrors = () => {
  cy.log('ttNoConsoleErrors - NCA TESTIFY')
  Cypress.on('window:before:load', (win) => {
    const windowErrorSpy = cy.spy(win.console, 'error')
    expect(windowErrorSpy).to.not.be.called
  })
}
exports.ttNoConsoleErrors = ttNoConsoleErrors
