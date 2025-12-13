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
    return nonRequestablePatterns.some((pattern) => href === pattern || href.startsWith(pattern));
};
const normalizeUrl = (href, baseUrl, currentUrl) => {
    if (href.startsWith('https://') || href.startsWith('http://')) {
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
        const selector = linkSelector ? `${linkSelector} a[href]` : 'a[href]';
        return cy.get(selector).then(($links) => {
            const uniqueLinks = new Set();
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
                        uniqueLinks.add(urlWithoutFragment);
                    }
                }
                catch {
                    cy.log(`Error processing URL: ${href}`);
                }
            });
            const internalLinks = Array.from(uniqueLinks);
            const linksWithCredentials = (0, extractAuth_1.addCredentialsToInternalLinks)(internalLinks, baseUrl);
            return cy.wrap(linksWithCredentials);
        });
    });
};
exports.ttGetInternalLinks = ttGetInternalLinks;
