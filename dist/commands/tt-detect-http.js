'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ttDetectHttp = void 0
const chai_1 = require('chai')
const ttDetectHttp = () => {
  cy.log('ttDetectHttp - NCA TESTIFY')
  cy.get('a').each((resultItem) => {
    cy.wrap(resultItem)
      .invoke('attr', 'href')
      .then((href) => {
        if (
          typeof href !== 'undefined' &&
          !href.includes('mailto') &&
          !href.includes('tel')
        ) {
          chai_1.assert.notInclude(href, 'http:')
        } else {
          cy.log(`Filtered URL: ${href}`)
        }
      })
  })
}
exports.ttDetectHttp = ttDetectHttp
