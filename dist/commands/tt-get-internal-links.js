"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ttGetInternalLinks = void 0;
const isInternal_1 = require("./../utils/isInternal");
const ttGetInternalLinks = () => {
    cy.log('ttGetInternalLinks - NCA TESTIFY');
    const listOfResults = [];
    return cy.get('a').then((anchorElements) => {
        const processLink = (index) => {
            if (index >= anchorElements.length) {
                return listOfResults;
            }
            const href = anchorElements[index].getAttribute('href');
            if (href &&
                href.trim() !== '' &&
                (0, isInternal_1.isInternal)(href) &&
                !href.includes('mailto') &&
                !href.includes('tel') &&
                !href.includes('#')) {
                const baseUrl = Cypress.config('baseUrl');
                const singleResult = href.replace(baseUrl, '');
                if (singleResult &&
                    singleResult.trim() !== '' &&
                    !listOfResults.includes(singleResult)) {
                    listOfResults.push(singleResult);
                }
            }
            else if (href) {
                cy.log('Filtered URL: ' + href);
            }
            else {
                cy.log('Empty or null URL');
            }
            return cy.then(() => processLink(index + 1));
        };
        return processLink(0);
    });
};
exports.ttGetInternalLinks = ttGetInternalLinks;
