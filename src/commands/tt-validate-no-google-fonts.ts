export const ttValidateNoGoogleFonts = () => {
    cy.intercept({ method: 'GET', path: '*' }, (req) => {
        if (!req.url.startsWith(`${Cypress.config('baseUrl')}`)) {
            expect(req.url).not.to.include('/fonts.gstatic.com/');
            expect(req.url).not.to.include('/fonts.googleapis.com/');
        }
    });
    cy.reload();
}