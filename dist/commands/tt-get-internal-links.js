"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ttGetInternalLinks = void 0;
const isInternal_1 = require("./../utils/isInternal");
const extractAuth_1 = require("./../utils/extractAuth");
const ttGetInternalLinks = (linkSelector = '') => {
    cy.log('ttGetInternalLinks - NCA TESTIFY');
    return cy.get(`${linkSelector} a`).then(($links) => {
        const baseUrl = Cypress.config('baseUrl');
        const auth = (0, extractAuth_1.extractAuth)(baseUrl);
        const internalLinks = [];
        $links.each((index, link) => {
            const href = link.getAttribute('href');
            if (href &&
                href.trim() !== '' &&
                (0, isInternal_1.isInternal)(href) &&
                !href.includes('mailto') &&
                !href.includes('tel') &&
                !href.includes('#')) {
                // Construct the full URL properly
                let fullUrl;
                if (href.startsWith('http')) {
                    // Already a full URL
                    fullUrl = href;
                }
                else if (href.startsWith('/')) {
                    // Absolute path - combine with baseUrl
                    const urlObj = new URL(baseUrl);
                    fullUrl = `${urlObj.protocol}//${urlObj.host}${href}`;
                }
                else {
                    // Relative path - use URL constructor
                    fullUrl = new URL(href, baseUrl).toString();
                }
                // Apply auth if needed
                if (auth) {
                    fullUrl = (0, extractAuth_1.applyAuth)(fullUrl, auth);
                }
                // Remove the baseUrl to get relative path
                const cleanBase = baseUrl.replace(/\/$/, ''); // Remove trailing slash
                const singleResult = fullUrl.replace(cleanBase, '');
                if (singleResult &&
                    singleResult.trim() !== '' &&
                    !internalLinks.includes(singleResult)) {
                    internalLinks.push(singleResult);
                }
            }
            else if (href) {
                cy.log('Filtered URL: ' + href);
            }
            else {
                cy.log('Empty or null URL');
            }
        });
        return cy.wrap(internalLinks);
    });
};
exports.ttGetInternalLinks = ttGetInternalLinks;
