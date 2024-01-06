export const ttEveryInternalLinkIsLoading = (): void => {
  cy.log('everyInternalLinkIsLoading - NCA TESTIFY')
  //@ts-ignore
  cy.ttGetInternalLinks().then((urls: string[]) => {
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
