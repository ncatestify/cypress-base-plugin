export const ttValidateCanonicalUrl = (): void => {
  cy.log('ttValidateCanonicalUrl - NCA TESTIFY')
  cy.get('head link[rel="canonical"]')
    .should('exist')
    .invoke('attr', 'href')
    .then((href: string) => {
      expect(href, 'Canonical URL href should not be empty').to.not.be.empty

      let canonicalUrl: URL
      try {
        canonicalUrl = new URL(href)
      } catch {
        const baseUrl = Cypress.config('baseUrl') as string
        let origin = ''
        try {
          origin = new URL(baseUrl).origin
        } catch {}
        canonicalUrl = new URL(`${origin}${href}`)
      }

      expect(
        canonicalUrl.protocol,
        `Canonical URL should use HTTPS, got: ${canonicalUrl.protocol}`
      ).to.eq('https:')

      cy.log(`Canonical URL: ${canonicalUrl.href}`)
    })
}
