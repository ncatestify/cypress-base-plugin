"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ttGetInternalLinks = void 0;
const isInternal_1 = require("./../utils/isInternal");
const extractAuth_1 = require("./../utils/extractAuth");
const isNonRequestableLink = (href) => {
    const nonRequestablePatterns = [
        '#',
        'javascript:',
        'mailto:',
        'tel:',
        'data:'
    ];
    return nonRequestablePatterns.some(pattern => href === pattern || href.startsWith(pattern));
};
const isNeverCodeAloneDomain = (url) => {
    return url.includes('projects.nevercodealone.de');
};
const normalizeUrl = (href, baseUrl, currentUrl) => {
    // Special case for projects.nevercodealone.de - accept both HTTP and HTTPS
    if (isNeverCodeAloneDomain(baseUrl) && href.startsWith('http://')) {
        return href;
    }
    if (href.startsWith('https://')) {
        return href;
    }
    if (href.startsWith('/')) {
        return new URL(href, baseUrl).toString();
    }
    return new URL(href, currentUrl).toString();
};
const ttGetInternalLinks = (linkSelector = '') => {
    cy.log('ttGetInternalLinks - NCA TESTIFY');
    const baseUrl = Cypress.config('baseUrl');
    return cy.url().then((currentUrl) => {
        return cy.get(`${linkSelector ? linkSelector + ' ' : ''}a[href]`).then(($links) => {
            const uniqueLinks = new Map();
            $links.each((_, element) => {
                const href = element.getAttribute('href');
                if (!href || !href.trim()) {
                    return;
                }
                if (isNonRequestableLink(href)) {
                    return;
                }
                try {
                    const normalizedUrl = normalizeUrl(href, baseUrl, currentUrl);
                    const urlWithoutFragment = normalizedUrl.split('#')[0];
                    if ((0, isInternal_1.isInternal)(urlWithoutFragment)) {
                        uniqueLinks.set(urlWithoutFragment, urlWithoutFragment);
                    }
                }
                catch {
                    cy.log(`Error processing URL: ${href}`);
                }
            });
            const internalLinks = Array.from(uniqueLinks.values());
            const linksWithCredentials = (0, extractAuth_1.addCredentialsToInternalLinks)(internalLinks, baseUrl);
            return cy.wrap(linksWithCredentials);
        });
    });
};
exports.ttGetInternalLinks = ttGetInternalLinks;
