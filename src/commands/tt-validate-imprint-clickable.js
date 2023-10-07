/**
 * Validates that the 'impressum' link is clickable and redirects to the correct page.
 * @returns A Cypress Chainable that resolves to a boolean indicating whether the link is clickable and redirects to the correct page.
 */
export const ttValidateImprintClickable = () => {
    cy.log('validateImprintClickable - NCA TESTIFY');
    if (cy.ttElementExists('.sg-cookie-optin-box-footer-links')) {
        cy.contains('.sg-cookie-optin-box-footer-links a', 'impressum', {
            matchCase: false
        }).click();
    }
    else {
        cy.wait(5000);
        cy.contains('a:visible', 'impressum', { matchCase: false }).click();
    }
    return cy.window().then((win) => {
        return win.location.href.includes('/impressum');
    });
};
