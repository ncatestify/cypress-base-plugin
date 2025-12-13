import { extractAuth } from './../utils/extractAuth'

export const ttInvalidPath404 = (): void => {
  cy.log('ttInvalidPath404 - NCA TESTIFY')

  const baseUrl = Cypress.config('baseUrl')
  const auth = extractAuth(baseUrl)

  const requestOptions: any = {
    url: '/TESTIFY.invalidUrl',
    failOnStatusCode: false
  }

  if (auth) {
    requestOptions.auth = {
      username: auth.username,
      password: auth.password
    }
  }

  cy.request(requestOptions).then((resp) => {
    assert.equal(resp.status, 404)
  })
}
