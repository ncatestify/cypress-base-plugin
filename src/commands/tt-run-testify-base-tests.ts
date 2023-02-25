export const ttRunTestifyBaseTests = () => {
  cy.log('ttRunTestifyBaseTests - NCA TESTIFY')
  cy.ttEveryInternalLinkStatusOk()
  cy.ttValidateAllImagesResponseStatusOk()
  cy.ttValidateNoGoogleServices()
  cy.ttValidateImprintClickable()
  cy.ttEveryInternalLinkIsLoading()
}
