"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ttGetInternalLinks = void 0;
const isInternal_1 = require("./../utils/isInternal");
const ttGetInternalLinks = (linkSelector = '') => {
    cy.log('ttGetInternalLinks - NCA TESTIFY');
    return cy.get(`${linkSelector} a`).then(($links) => {
        const internalLinks = [];
        $links.each((index, link) => {
            const href = link.getAttribute('href');
            if (href &&
                href.trim() !== '' &&
                !href.includes('mailto:') &&
                !href.includes('tel:') &&
                !href.includes('#') &&
                !href.startsWith('javascript:') &&
                (0, isInternal_1.isInternal)(href)) {
                if (!internalLinks.includes(href)) {
                    internalLinks.push(href);
                }
            }
        });
        return cy.wrap(internalLinks);
    });
};
exports.ttGetInternalLinks = ttGetInternalLinks;
