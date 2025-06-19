"use strict";
/// <reference types="cypress" />
/// <reference path="../index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.ttEveryInternalLinkIsLoading = void 0;
const domainMapping_1 = require("./../utils/domainMapping");
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
const isExternalLink = (href, baseUrl) => {
    try {
        const linkUrl = new URL(href);
        const baseUrlObj = new URL(baseUrl);
        return linkUrl.hostname !== baseUrlObj.hostname;
    }
    catch {
        return false;
    }
};
const normalizeUrl = (href, baseUrl, currentUrl) => {
    if (href.startsWith('http://') || href.startsWith('https://')) {
        return href;
    }
    if (href.startsWith('/')) {
        return new URL(href, baseUrl).toString();
    }
    return new URL(href, currentUrl).toString();
};
const validateLink = (link, config, baseUrl) => {
    const { href } = link;
    // Apply domain mapping
    const mappedHref = (0, domainMapping_1.applyDomainMapping)(href, config, baseUrl);
    const wasMapped = mappedHref !== href;
    if (wasMapped) {
        cy.log(`🔄 Mapped ${href} → ${mappedHref}`);
    }
    // Validate that we have a proper URL before making requests
    if (!mappedHref || mappedHref.trim() === '') {
        cy.log(`⚠️ Skipping empty URL after mapping: ${href} → ${mappedHref}`);
        return;
    }
    if (mappedHref.includes('.pdf')) {
        cy.log(`Validating PDF: ${mappedHref}`);
        cy.request({
            url: mappedHref,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.be.oneOf([200, 301, 302, 307, 308]);
        });
    }
    else {
        cy.visit(mappedHref);
        cy.get('a').should('be.visible');
        //@ts-ignore - Custom command type not available in build context
        cy.ttValidateAllImagesResponseStatusOk();
    }
    cy.clearAllLocalStorage();
};
const ttEveryInternalLinkIsLoading = (limitOrConfig = 10, legacyConfig) => {
    cy.log('everyInternalLinkIsLoading - NCA TESTIFY');
    // Handle backwards compatibility
    let limit = 10;
    let config = {};
    if (typeof limitOrConfig === 'number') {
        limit = limitOrConfig;
        config = legacyConfig || {};
    }
    else {
        config = limitOrConfig;
        limit = config.minLinksRequired || 10;
    }
    const baseUrl = Cypress.config('baseUrl');
    cy.url().then((currentUrl) => {
        cy.get('a[href]').then(($links) => {
            const uniqueLinks = new Map();
            // Collect valid internal links
            $links.each((_, element) => {
                const href = element.getAttribute('href');
                if (!href || !href.trim()) {
                    return;
                }
                if (isNonRequestableLink(href)) {
                    cy.log(`Skipping non-requestable link: ${href}`);
                    return;
                }
                if (href.startsWith('http') && isExternalLink(href, baseUrl)) {
                    cy.log(`Skipping external link: ${href}`);
                    return;
                }
                try {
                    const normalizedUrl = normalizeUrl(href, baseUrl, currentUrl);
                    const urlWithoutFragment = normalizedUrl.split('#')[0];
                    if (!uniqueLinks.has(urlWithoutFragment)) {
                        uniqueLinks.set(urlWithoutFragment, {
                            href: urlWithoutFragment,
                            element: element
                        });
                    }
                }
                catch (error) {
                    cy.log(`Error processing URL: ${href}`);
                }
            });
            // Validate links up to the limit
            const linksToValidate = Array.from(uniqueLinks.values()).slice(0, limit);
            cy.log(`Found ${uniqueLinks.size} unique internal links, validating ${linksToValidate.length}`);
            linksToValidate.forEach(link => validateLink(link, config, baseUrl));
        });
    });
};
exports.ttEveryInternalLinkIsLoading = ttEveryInternalLinkIsLoading;
