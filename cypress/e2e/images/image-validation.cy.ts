describe('Image Validation Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Images have OK response status', () => {
    cy.ttValidateAllImagesResponseStatusOk()
  })
})
