describe('Page Content Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Validate page content', () => {
    cy.ttValidatePageContent()
  })

  it('Language tag is valid', () => {
    cy.ttValidateLanguageTag('en')
  })

  it('Validate subpages and images', () => {
    cy.ttValidateSubpagesAndImages()
  })
})
