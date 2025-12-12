describe('SEO Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Only one H1 element exists', () => {
    cy.ttOnlyOneH1()
  })
})
