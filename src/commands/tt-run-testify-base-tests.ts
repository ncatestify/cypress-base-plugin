//@ts-nocheck
export const ttRunTestifyBaseTests = (): void => {
  cy.log('ttRunTestifyBaseTests - NCA TESTIFY')
  cy.ttEveryInternalLinkStatusOk()
  cy.ttValidateAllImagesResponseStatusOk()
  cy.ttValidateNoGoogleServices()
  cy.ttValidateImprintClickable()
  cy.ttEveryInternalLinkIsLoading()
  cy.ttAccessibility()
  cy.ttOnlyOneH1()
  cy.ttInvalidPath404()
  cy.ttValidateLanguageTag('de')
  cy.ttDetectHttp()
}
