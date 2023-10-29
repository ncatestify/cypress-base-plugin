export const ttEveryInternalLinkIsLoading = () => {
  cy.log('everyInternalLinkIsLoading - NCA TESTIFY')
  cy.ttGetInternalLinks().then((urls: Array<string>) => {
    urls.forEach((url) => {
      if (!url.includes('.pdf')) {
        cy.visit(url)
        cy.get('a').should('be.visible')
      } else {
        cy.log('PDF detected' + url)
      }
      cy.clearAllLocalStorage()
    })
  })
}
