export const ttInvalidPath404 = () => {
  cy.log('ttInvalidPath404 - NCA TESTIFY')
  cy.request({
    url: '/TESTIFY.invalidUrl',
    failOnStatusCode: false,
  }).then((resp) => {
    expect(resp.status).to.eq(404)
  })
}
