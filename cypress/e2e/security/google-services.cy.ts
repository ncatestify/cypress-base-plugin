describe('Google Services Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('No Google services detected', () => {
    cy.ttValidateNoGoogleServices()
  })
})
