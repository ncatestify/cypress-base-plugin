export const ttEveryInternalLinkIsLoading = (limit: number = 10): void => {
  cy.log('everyInternalLinkIsLoading - NCA TESTIFY')
  //@ts-ignore
  cy.ttGetInternalLinks().then((urls: string[]) => {
    urls.slice(0, limit).forEach((url) => {
      if (!url.includes('.pdf')) {
        cy.visit(url)
        cy.get('a').should('be.visible')
        cy.ttValidateAllImagesResponseStatusOk()
      } else {
        cy.log('PDF detected' + url)
      }
      cy.clearAllLocalStorage()
    })
  })
}
