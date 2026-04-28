import { extractAuth } from './../utils/extractAuth'

export const ttValidateFavicon = (): void => {
  cy.log('ttValidateFavicon - NCA TESTIFY')
  cy.get('head link[rel*="icon"]')
    .should('exist')
    .invoke('attr', 'href')
    .then((href: string) => {
      expect(href, 'Favicon href should not be empty').to.not.be.empty

      const baseUrl = Cypress.config('baseUrl') as string
      let faviconUrl = href
      if (href.startsWith('/')) {
        let origin = baseUrl
        try {
          origin = new URL(baseUrl).origin
        } catch {}
        faviconUrl = `${origin}${href}`
      }

      cy.log(`Favicon URL: ${faviconUrl}`)

      const auth = extractAuth(baseUrl)
      const requestOptions: Partial<Cypress.RequestOptions> = {
        method: 'HEAD',
        url: faviconUrl,
        failOnStatusCode: false
      }

      if (auth) {
        requestOptions.auth = {
          username: auth.username,
          password: auth.password
        }
      }

      cy.request(requestOptions).then((response) => {
        expect(
          response.status,
          `Favicon should return HTTP 200, got ${response.status} for ${faviconUrl}`
        ).to.eq(200)
      })
    })
}
