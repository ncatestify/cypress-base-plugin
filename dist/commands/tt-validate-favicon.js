"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ttValidateFavicon = void 0;
const extractAuth_1 = require("./../utils/extractAuth");
const ttValidateFavicon = () => {
    cy.log('ttValidateFavicon - NCA TESTIFY');
    cy.get('head link[rel*="icon"]')
        .should('exist')
        .invoke('attr', 'href')
        .then((href) => {
        expect(href, 'Favicon href should not be empty').to.not.be.empty;
        const baseUrl = Cypress.config('baseUrl');
        let faviconUrl = href;
        if (href.startsWith('/')) {
            let origin = baseUrl;
            try {
                origin = new URL(baseUrl).origin;
            }
            catch { }
            faviconUrl = `${origin}${href}`;
        }
        cy.log(`Favicon URL: ${faviconUrl}`);
        const auth = (0, extractAuth_1.extractAuth)(baseUrl);
        const requestOptions = {
            method: 'HEAD',
            url: faviconUrl,
            failOnStatusCode: false
        };
        if (auth) {
            requestOptions.auth = {
                username: auth.username,
                password: auth.password
            };
        }
        cy.request(requestOptions).then((response) => {
            expect(response.status, `Favicon should return HTTP 200, got ${response.status} for ${faviconUrl}`).to.eq(200);
        });
    });
};
exports.ttValidateFavicon = ttValidateFavicon;
