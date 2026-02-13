/// <reference path="../index.d.ts" />

export const ttEveryInternalLinkStatusOk = (
  minLinksRequired: number = 1
): Cypress.Chainable<any> => {
  return cy.ttGetInternalLinks().then((urls: string[]) => {
    cy.log('everyInternalLinkStatusOk - NCA TESTIFY')
    cy.wrap(urls).its('length').should('be.gte', minLinksRequired)

    const failedLinks: { url: string; status: number }[] = []

    urls.forEach((url) => {
      cy.request({
        url,
        failOnStatusCode: false
      }).then((resp) => {
        if (resp.headers['content-type']?.includes('text/html')) {
          const validStatuses = [200, 301, 302]
          const success = validStatuses.includes(resp.status)
          cy.log(`${success ? '✅' : '❌'} Testing ${url}: ${resp.status}`)

          if (!success) {
            failedLinks.push({ url, status: resp.status })
            cy.log(`⚠️ Link validation failed: ${url} returned ${resp.status}`)
          }
        } else {
          cy.log(
            `⏭️ Testing ${url}: Skipped (content-type: ${resp.headers['content-type']})`
          )
        }
      })
    })

    return cy.then(() => {
      expect(failedLinks).to.have.length(
        0,
        `Links with invalid status: ${failedLinks.map((l) => `${l.url} (${l.status})`).join(', ')}`
      )
      return null
    })
  })
}
