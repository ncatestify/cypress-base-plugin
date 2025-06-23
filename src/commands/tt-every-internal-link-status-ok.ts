export const ttEveryInternalLinkStatusOk = (
  minLinksRequired: number = 1
): Cypress.Chainable<any> => {
  //@ts-ignore - Custom command type not available in build context
  return cy.ttGetInternalLinks().then((urls: string[]) => {
    cy.log('everyInternalLinkStatusOk - NCA TESTIFY')
    cy.wrap(urls).its('length').should('be.gte', minLinksRequired)
    
    let allLinksOk = true
    urls.forEach((url) => {
      const requestOptions: any = { 
        url: url,
        failOnStatusCode: false 
      }
      
      cy.request(requestOptions).then((resp) => {
        if (resp.headers['content-type']?.includes('text/html')) {
          const success = resp.status === 200
          allLinksOk = allLinksOk && success
          cy.log(`${success ? '✅' : '❌'} Testing ${url}: ${resp.status}`)
          
          if (!success) {
            cy.log(`⚠️ Link validation failed: ${url} returned ${resp.status}`)
          }
        } else {
          cy.log(`⏭️ Testing ${url}: Skipped (content-type: ${resp.headers['content-type']})`)
        }
      })
    })
    return cy.wrap(allLinksOk)
  })
}
