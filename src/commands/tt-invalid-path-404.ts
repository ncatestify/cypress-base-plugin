export const ttInvalidPath404 = (): void => {
  cy.log('ttInvalidPath404 - NCA TESTIFY')
  cy.request({
    url: '/TESTIFY.invalidUrl',
    failOnStatusCode: false
  }).then((resp) => {
    assert.equal(resp.status, 404)
  })
}
