"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ttEveryInternalLinkStatusOk = void 0;
const extractAuth_1 = require("./../utils/extractAuth");
const ttEveryInternalLinkStatusOk = () => {
    //@ts-ignore
    return cy.ttGetInternalLinks().then((urls) => {
        cy.log('everyInternalLinkStatusOk - NCA TESTIFY');
        cy.wrap(urls).its('length').should('be.gt', 2);
        const baseUrl = Cypress.config('baseUrl');
        const auth = (0, extractAuth_1.extractAuth)(baseUrl);
        let allLinksOk = true;
        urls.forEach((url) => {
            // Extract auth from base URL and apply to request
            const fullUrl = url.startsWith('http') ? url : baseUrl + url;
            const requestOptions = { url: fullUrl };
            if (auth) {
                requestOptions.auth = {
                    username: auth.username,
                    password: auth.password
                };
            }
            cy.request(requestOptions).then((resp) => {
                if (resp.headers['content-type'].includes('text/html')) {
                    allLinksOk = allLinksOk && resp.status === 200;
                }
                else {
                    cy.log('Skip content type');
                    cy.log(url);
                    cy.log(resp.headers['content-type'].toString());
                }
            });
        });
        return cy.wrap(allLinksOk);
    });
};
exports.ttEveryInternalLinkStatusOk = ttEveryInternalLinkStatusOk;
