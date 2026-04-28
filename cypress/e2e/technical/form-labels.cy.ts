describe('Technical Tests - Form Labels', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('All form elements have associated labels', () => {
    cy.ttValidateFormLabels()
  })
})
