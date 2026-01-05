'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ttOnlyOneH1 = void 0
const ttOnlyOneH1 = () => {
  cy.log('ttOnlyOneH1 - NCA TESTIFY')
  // @ts-ignore - Custom command registered at runtime
  cy.ttEl('h1', 'h1Heading').its('length').should('eq', 1)
}
exports.ttOnlyOneH1 = ttOnlyOneH1
