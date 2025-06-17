"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ttValidateAllImagesResponseStatusOk = void 0;
const extractAuth_1 = require("./../utils/extractAuth");
const excludedUrlPrefixes = ['data:'];
const isExcludedUrl = (url) => {
    return excludedUrlPrefixes.some((prefix) => url.startsWith(prefix));
};
const normalizeUrl = (url) => {
    return url.startsWith('//') ? `https:${url}` : url;
};
const ttValidateAllImagesResponseStatusOk = () => {
    const imageUrls = new Set();
    cy.log('More then 0 images found');
    cy.get('img').should('be.visible');
    cy.get('img').should('have.length.gt', 0);
    cy.get('img')
        .each(($img) => {
        var _a;
        const img = $img[0];
        const src = img.getAttribute('src');
        const srcset = img.getAttribute('srcset');
        if (src !== null) {
            const normalizedSrc = normalizeUrl(src);
            if (!isExcludedUrl(normalizedSrc)) {
                imageUrls.add(normalizedSrc);
            }
        }
        if (srcset !== null) {
            const srcsetUrls = srcset
                .split(',')
                .map((srcsetItem) => srcsetItem.trim().split(' ')[0])
                .map(normalizeUrl);
            srcsetUrls.forEach((url) => {
                if (!isExcludedUrl(url) && !imageUrls.has(url)) {
                    imageUrls.add(url);
                }
            });
        }
        if (src === null && srcset === null) {
            const alt = (_a = img.getAttribute('alt')) !== null && _a !== void 0 ? _a : '';
            cy.log(`Image ${alt} has neither src nor srcset attribute`);
            throw new Error(`Image ${alt} has neither src nor srcset attribute`);
        }
    })
        .then(() => {
        const promises = [];
        const baseUrl = Cypress.config('baseUrl');
        const auth = (0, extractAuth_1.extractAuth)(baseUrl);
        imageUrls.forEach((url) => {
            const requestOptions = {
                method: 'HEAD',
                url: url
            };
            if (auth) {
                requestOptions.auth = {
                    username: auth.username,
                    password: auth.password
                };
            }
            const promise = cy
                .request(requestOptions)
                .its('status')
                .should('eq', 200)
                .then(() => {
                cy.log(`Validated image: ${url}`);
            });
            promises.push(promise);
        });
        return Cypress.Promise.all(promises);
    });
};
exports.ttValidateAllImagesResponseStatusOk = ttValidateAllImagesResponseStatusOk;
