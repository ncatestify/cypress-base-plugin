describe('Imprint Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Imprint link is clickable', () => {
    cy.ttValidateImprintClickable()
  })
})
