export const ttValidateNoGoogleServices = (): void => {
  cy.on('request', (req) => {
    if (!(req.url as string).startsWith(`${Cypress.config('baseUrl') ?? ''}`)) {
      cy.log('External url: ' + String(req.url))
      expect(req.url).not.to.contain('/fonts.gstatic.com/')
      expect(req.url).not.to.contain('/fonts.googleapis.com/')
      expect(req.url).not.to.contain('/maps.google')
      expect(req.url).not.to.contain('/google.com/maps')
    }
  })

  cy.reload()
}
