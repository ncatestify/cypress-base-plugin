import { extractAuth } from './../utils/extractAuth'

export const ttEveryInternalLinkStatusOk = (): Cypress.Chainable<any> => {
  //@ts-ignore
  return cy.ttGetInternalLinks().then((urls: string[]) => {
    cy.log('everyInternalLinkStatusOk - NCA TESTIFY')
    cy.wrap(urls).its('length').should('be.gt', 2)
    
    const baseUrl = Cypress.config('baseUrl')
    const auth = extractAuth(baseUrl)
    
    let allLinksOk = true
    urls.forEach((url) => {
      // Extract auth from base URL and apply to request
      const fullUrl = url.startsWith('http') ? url : baseUrl + url
      const requestOptions: any = { url: fullUrl }
      
      if (auth) {
        requestOptions.auth = {
          username: auth.username,
          password: auth.password
        }
      }
      
      cy.request(requestOptions).then((resp) => {
        if (resp.headers['content-type'].includes('text/html')) {
          allLinksOk = allLinksOk && resp.status === 200
        } else {
          cy.log('Skip content type')
          cy.log(url)
          cy.log(resp.headers['content-type'].toString())
        }
      })
    })
    return cy.wrap(allLinksOk)
  })
}
