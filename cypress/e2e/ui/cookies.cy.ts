describe('Cookie Tests', () => {
  it('Accept all cookies on "alles" page', () => {
    cy.visit('/alles/')
    cy.ttCookieAllAcceptClick()
  })

  it('Accept all cookies on "alle" page', () => {
    cy.visit('/alle/')
    cy.ttCookieAllAcceptClick()
  })
})
