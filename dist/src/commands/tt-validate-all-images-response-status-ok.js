define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ttValidateAllImagesResponseStatusOk = void 0;
    const excludedUrlPrefixes = ['data:'];
    const isExcludedUrl = (url) => {
        return excludedUrlPrefixes.some((prefix) => url.startsWith(prefix));
    };
    const normalizeUrl = (url) => {
        return url.startsWith('//') ? `https:${url}` : url;
    };
    const ttValidateAllImagesResponseStatusOk = () => {
        const srcSet = new Set();
        const srcSetArray = new Set();
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
                    srcSet.add(normalizedSrc);
                }
            }
            if (srcset !== null) {
                const srcsetUrls = srcset
                    .split(',')
                    .map((srcsetItem) => srcsetItem.trim().split(' ')[0])
                    .map(normalizeUrl);
                srcsetUrls.forEach((url) => {
                    if (!isExcludedUrl(url)) {
                        srcSetArray.add(url);
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
            srcSet.forEach((url) => {
                const promise = cy
                    .request('HEAD', url)
                    .its('status')
                    .should('eq', 200)
                    .then(() => {
                    cy.log(`Validated image: ${url}`);
                });
                promises.push(promise);
            });
            srcSetArray.forEach((url) => {
                const promise = cy
                    .request('HEAD', url)
                    .its('status')
                    .should('eq', 200)
                    .then(() => {
                    cy.log(`Validated image in srcset: ${url}`);
                });
                promises.push(promise);
            });
            return Cypress.Promise.all(promises);
        })
            .then(() => {
            srcSet.forEach((entry) => {
                cy.get(`[src="${entry}"]`).should('exist');
            });
            srcSetArray.forEach((entry) => {
                cy.get(`[srcset*="${entry}"]`).should('exist');
            });
        });
    };
    exports.ttValidateAllImagesResponseStatusOk = ttValidateAllImagesResponseStatusOk;
});
