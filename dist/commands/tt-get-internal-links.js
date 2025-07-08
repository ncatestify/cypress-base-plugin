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
    const ncaIP = '213.203.219.157';
    // Check if URL contains NCA IP or known NCA patterns
    const isNCA = url.includes(ncaIP) ||
        url.includes('nevercodealone.de') ||
        url.includes('dsv98.de');
    return cy.wrap(isNCA);
};
const normalizeUrl = (href, baseUrl, currentUrl, allowHttp = false) => {
    // Special case for NCA domains - accept both HTTP and HTTPS
    if (allowHttp && href.startsWith('http://')) {
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
    let baseUrl = Cypress.config('baseUrl');
    // If baseUrl contains the NCA IP, use HTTP instead of HTTPS
    const ncaIP = '213.203.219.157';
    if (baseUrl.includes(ncaIP)) {
        baseUrl = baseUrl.replace('https://', 'http://');
    }
    // First check if baseUrl is an NCA domain
    return isNeverCodeAloneDomain(baseUrl).then((isNCADomain) => {
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
                        const normalizedUrl = normalizeUrl(href, baseUrl, currentUrl, isNCADomain);
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
    });
};
exports.ttGetInternalLinks = ttGetInternalLinks;
