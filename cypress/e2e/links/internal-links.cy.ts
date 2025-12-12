describe('Internal Links Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('All internal links are loading', () => {
    cy.ttEveryInternalLinkIsLoading()
  })

  it('All internal links have OK status', () => {
    cy.ttEveryInternalLinkStatusOk()
  })

  it('Invalid path returns 404', () => {
    cy.ttInvalidPath404()
  })
})
