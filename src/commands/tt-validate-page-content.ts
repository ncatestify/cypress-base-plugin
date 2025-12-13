// @ts-nocheck - Cypress custom commands are dynamically registered
export const ttValidatePageContent = (): void => {
  cy.ttAccessibility()
  cy.ttValidateNoGoogleServices()
  cy.ttValidateAllImagesResponseStatusOk()
  cy.ttEveryInternalLinkStatusOk()
  cy.ttEveryInternalLinkIsLoading()
  cy.ttValidateImprintClickable()
  cy.ttOnlyOneH1()
  cy.ttDetectHttp()
}
