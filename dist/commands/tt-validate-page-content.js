export const ttValidatePageContent = () => {
  cy.ttAccessibility()
  cy.ttValidateNoGoogleServices()
  cy.ttValidateAllImagesResponseStatusOk()
  cy.ttEveryInternalLinkStatusOk()
  cy.ttEveryInternalLinkIsLoading()
  cy.ttValidateImprintClickable()
  cy.ttOnlyOneH1()
  cy.ttDetectHttp()
}
