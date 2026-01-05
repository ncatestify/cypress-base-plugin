'use strict'
/// <reference types="cypress" />
/// <reference path="../index.d.ts" />
Object.defineProperty(exports, '__esModule', { value: true })
exports.ttEveryInternalLinkIsLoading = void 0
const ttEveryInternalLinkIsLoading = (limit = 10) => {
  cy.log('everyInternalLinkIsLoading - NCA TESTIFY')
  //@ts-ignore - Custom command type not available in build context
  cy.ttGetInternalLinks().then((internalLinks) => {
    const linksToValidate = internalLinks.slice(0, limit)
    cy.log(
      `Found ${internalLinks.length} unique internal links, validating ${linksToValidate.length}`
    )
    linksToValidate.forEach((href) => {
      if (href.includes('.pdf')) {
        cy.log(`Validating PDF: ${href}`)
        cy.request({
          url: href,
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.be.oneOf([200, 301, 302, 307, 308])
        })
      } else {
        cy.visit(href)
        cy.get('a').should('be.visible')
        //@ts-ignore - Custom command type not available in build context
        cy.ttValidateAllImagesResponseStatusOk()
      }
      cy.clearAllLocalStorage()
    })
  })
}
exports.ttEveryInternalLinkIsLoading = ttEveryInternalLinkIsLoading
