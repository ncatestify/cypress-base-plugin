"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ttGetInternalLinks = void 0;
const isInternal_1 = require("./../utils/isInternal");
const extractAuth_1 = require("./../utils/extractAuth");
const domainMapping_1 = require("./../utils/domainMapping");
const ttGetInternalLinks = (linkSelectorOrConfig = '', legacyConfig) => {
    // Handle backwards compatibility
    let linkSelector = '';
    let config = {};
    if (typeof linkSelectorOrConfig === 'string') {
        linkSelector = linkSelectorOrConfig;
        config = legacyConfig || {};
    }
    else {
        config = linkSelectorOrConfig;
    }
    cy.log('ttGetInternalLinks - NCA TESTIFY');
    return cy.get(`${linkSelector} a`).then(($links) => {
        const baseUrl = Cypress.config('baseUrl');
        const auth = (0, extractAuth_1.extractAuth)(baseUrl);
        const internalLinks = [];
        $links.each((index, link) => {
            const href = link.getAttribute('href');
            if (href &&
                href.trim() !== '' &&
                !href.includes('mailto') &&
                !href.includes('tel') &&
                !href.includes('#') &&
                !href.startsWith('javascript:') &&
                ((0, isInternal_1.isInternal)(href) || (0, domainMapping_1.shouldIncludeUrl)(href, config, baseUrl))) {
                // Handle both internal and external URLs
                let urlToStore;
                if (href.startsWith('http')) {
                    // Already a full URL (could be external)
                    urlToStore = href;
                }
                else if (href.startsWith('/')) {
                    // Absolute path - combine with baseUrl to create relative path
                    urlToStore = href;
                }
                else {
                    // Relative path - convert to absolute path
                    const fullUrl = new URL(href, baseUrl).toString();
                    const cleanBase = baseUrl.replace(/\/$/, '');
                    urlToStore = fullUrl.replace(cleanBase, '');
                }
                // Apply auth if needed for internal URLs
                if (auth && !urlToStore.startsWith('http')) {
                    const fullUrl = urlToStore.startsWith('/') ? baseUrl + urlToStore : urlToStore;
                    const authUrl = (0, extractAuth_1.applyAuth)(fullUrl, auth);
                    const cleanBase = baseUrl.replace(/\/$/, '');
                    urlToStore = authUrl.replace(cleanBase, '');
                }
                if (urlToStore &&
                    urlToStore.trim() !== '' &&
                    !internalLinks.includes(urlToStore)) {
                    internalLinks.push(urlToStore);
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
