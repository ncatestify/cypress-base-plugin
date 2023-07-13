export const ttValidateAllImagesResponseStatusOk = () => {
  cy.log('ttValidateAllImagesResponseStatusOk - NCA TESTIFY')

  cy.get('img').should('have.length.gt', 0)  
  cy.get('img').each((img) => {
    cy.wrap(img)
      .should('have.attr', 'src')
      .then((src) => {
        if (typeof src === 'string') {
          cy.request(src).its('status').should('eq', 200)
          cy.log('Validated image: ' + src)
        } else {
          cy.log('img src is not a string')
        }
      })
  })
}
