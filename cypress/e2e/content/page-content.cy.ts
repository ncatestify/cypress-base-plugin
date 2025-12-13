describe('Page Content Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Validate page content', () => {
    cy.ttValidatePageContent()
  })

  it('Validate subpages and images', () => {
    cy.ttValidateSubpagesAndImages()
  })
})
