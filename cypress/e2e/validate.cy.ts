describe('Validate Testify Tests', () => {
  beforeEach(() => {
    cy.visit('/de/use-cases')
  })

  it('Accessibility test', () => {
    cy.ttAccessibility()
  })

  it('Runs Testify base tests', () => {
    // cy.ttEveryInternalLinkStatusOk()
    // cy.ttValidateImprintClickable()
    // cy.ttValidateNoGoogleServices()
    // cy.ttValidateAllImagesResponseStatusOk()
    cy.ttRunTestifyBaseTests()
  })
})
