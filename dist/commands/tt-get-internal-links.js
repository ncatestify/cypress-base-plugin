'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ttGetInternalLinks = void 0
const isInternal_1 = require('./../utils/isInternal')
const ttGetInternalLinks = (linkSelector = '') => {
  cy.log('ttGetInternalLinks - NCA TESTIFY')
  return cy.get(`${linkSelector} a`).then(($links) => {
    const baseUrl = Cypress.config('baseUrl')
    const internalLinks = []
    $links.each((index, link) => {
      const href = link.getAttribute('href')
      if (
        href &&
        href.trim() !== '' &&
        (0, isInternal_1.isInternal)(href) &&
        !href.includes('mailto') &&
        !href.includes('tel') &&
        !href.includes('#')
      ) {
        const singleResult = href.replace(baseUrl, '')
        if (
          singleResult &&
          singleResult.trim() !== '' &&
          !internalLinks.includes(singleResult)
        ) {
          internalLinks.push(singleResult)
        }
      } else if (href) {
        cy.log('Filtered URL: ' + href)
      } else {
        cy.log('Empty or null URL')
      }
    })
    return cy.wrap(internalLinks)
  })
}
exports.ttGetInternalLinks = ttGetInternalLinks
