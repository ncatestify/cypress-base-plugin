"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ttValidateCanonicalUrl = void 0;
const ttValidateCanonicalUrl = () => {
    cy.log('ttValidateCanonicalUrl - NCA TESTIFY');
    cy.get('head link[rel="canonical"]')
        .should('exist')
        .invoke('attr', 'href')
        .then((href) => {
        expect(href, 'Canonical URL href should not be empty').to.not.be.empty;
        let canonicalUrl;
        try {
            canonicalUrl = new URL(href);
        }
        catch {
            const baseUrl = Cypress.config('baseUrl');
            let origin = '';
            try {
                origin = new URL(baseUrl).origin;
            }
            catch { }
            canonicalUrl = new URL(`${origin}${href}`);
        }
        expect(canonicalUrl.protocol, `Canonical URL should use HTTPS, got: ${canonicalUrl.protocol}`).to.eq('https:');
        cy.log(`Canonical URL: ${canonicalUrl.href}`);
    });
};
exports.ttValidateCanonicalUrl = ttValidateCanonicalUrl;
