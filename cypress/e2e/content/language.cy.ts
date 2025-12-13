describe('Language Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('HTML has valid lang attribute', () => {
    cy.get('html')
      .should('have.attr', 'lang')
      .and('match', /^[a-z]{2}(-[A-Z]{2})?$/)
  })

  it('Lang matches page language', () => {
    cy.ttValidateLanguageTag()
  })

  it('Lang validation rejects wrong language', () => {
    cy.on('fail', (err) => {
      expect(err.message).to.include('en')
      return false
    })
    cy.ttValidateLanguageTag('en')
  })
})
