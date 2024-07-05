'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ttValidatePageContent = void 0
//@ts-nocheck
const ttValidatePageContent = () => {
  cy.ttAccessibility()
  cy.ttValidateNoGoogleServices()
  cy.ttValidateAllImagesResponseStatusOk()
  cy.ttEveryInternalLinkStatusOk()
  cy.ttEveryInternalLinkIsLoading()
  cy.ttValidateImprintClickable()
  cy.ttOnlyOneH1()
  cy.ttDetectHttp()
}
exports.ttValidatePageContent = ttValidatePageContent
