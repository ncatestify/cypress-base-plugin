describe('SEO Meta Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Meta description exists and is not empty', () => {
    cy.ttValidateMetaDescription()
  })

  it('Title tag exists and is not empty', () => {
    cy.ttValidateTitleTag()
  })

  it('Viewport meta tag exists with width=device-width', () => {
    cy.ttValidateViewportMeta()
  })
})
