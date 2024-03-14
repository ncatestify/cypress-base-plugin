"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ttEveryInternalLinkIsLoading = void 0;
const ttEveryInternalLinkIsLoading = (limit = 10) => {
    cy.log('everyInternalLinkIsLoading - NCA TESTIFY');
    //@ts-ignore
    cy.ttGetInternalLinks().then((urls) => {
        urls.slice(0, limit).forEach((url) => {
            if (!url.includes('.pdf')) {
                cy.visit(url);
                cy.get('a').should('be.visible');
            }
            else {
                cy.log('PDF detected' + url);
            }
            cy.clearAllLocalStorage();
        });
    });
};
exports.ttEveryInternalLinkIsLoading = ttEveryInternalLinkIsLoading;
