export const ttValidateNoGoogleServices = (): void => {
  cy.on('request', (req) => {
    if (!req.url.startsWith(`${Cypress.config('baseUrl')}`)) {
      cy.log('External url: ' + req.url);
      expect(req.url).not.to.include('/fonts.gstatic.com/');
      expect(req.url).not.to.include('/fonts.googleapis.com/');
      expect(req.url).not.to.include('/maps.google');
      expect(req.url).not.to.include('/google.com/maps');
    }
  });

  cy.reload();
};

