"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ttEveryInternalLinkStatusOk = void 0;
const extractAuth_1 = require("./../utils/extractAuth");
const domainMapping_1 = require("./../utils/domainMapping");
const ttEveryInternalLinkStatusOk = (config = {}) => {
    const { minLinksRequired = 1 } = config;
    //@ts-ignore
    return cy.ttGetInternalLinks(config).then((urls) => {
        cy.log('everyInternalLinkStatusOk - NCA TESTIFY');
        cy.wrap(urls).its('length').should('be.gte', minLinksRequired);
        const baseUrl = Cypress.config('baseUrl');
        const auth = (0, extractAuth_1.extractAuth)(baseUrl);
        let allLinksOk = true;
        urls.forEach((url) => {
            // Apply domain mapping for staging environments
            const mappedUrl = (0, domainMapping_1.applyDomainMapping)(url, config, baseUrl);
            const fullUrl = mappedUrl.startsWith('http') ? mappedUrl : baseUrl + mappedUrl;
            const requestOptions = {
                url: fullUrl,
                failOnStatusCode: false
            };
            if (auth) {
                requestOptions.auth = {
                    username: auth.username,
                    password: auth.password
                };
            }
            cy.request(requestOptions).then((resp) => {
                var _a;
                const wasMapped = mappedUrl !== url;
                const logPrefix = wasMapped ? `🔄 Mapped ${url} → ${mappedUrl}:` : `Testing ${fullUrl}:`;
                if ((_a = resp.headers['content-type']) === null || _a === void 0 ? void 0 : _a.includes('text/html')) {
                    const success = resp.status === 200;
                    allLinksOk = allLinksOk && success;
                    cy.log(`${success ? '✅' : '❌'} ${logPrefix} ${resp.status}`);
                    if (!success) {
                        cy.log(`⚠️ Link validation failed: ${fullUrl} returned ${resp.status}`);
                    }
                }
                else {
                    cy.log(`⏭️ ${logPrefix} Skipped (content-type: ${resp.headers['content-type']})`);
                }
            });
        });
        return cy.wrap(allLinksOk);
    });
};
exports.ttEveryInternalLinkStatusOk = ttEveryInternalLinkStatusOk;
