describe('SEO Tests - Canonical URL', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Canonical URL exists and is valid', () => {
    cy.ttValidateCanonicalUrl()
  })
})
