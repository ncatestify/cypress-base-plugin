describe('SEO Tests - Favicon', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Favicon exists and returns HTTP 200', () => {
    cy.ttValidateFavicon()
  })
})
