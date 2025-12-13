describe('HTTP Detection Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Detect HTTP connections', () => {
    cy.ttDetectHttp()
  })
})
