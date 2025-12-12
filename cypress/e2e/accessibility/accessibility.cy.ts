describe('Accessibility Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Run accessibility tests', () => {
    cy.ttAccessibility()
  })
})
