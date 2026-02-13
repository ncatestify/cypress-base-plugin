"use strict";
/// <reference path="../index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.ttEveryInternalLinkStatusOk = void 0;
const ttEveryInternalLinkStatusOk = (minLinksRequired = 1) => {
    return cy.ttGetInternalLinks().then((urls) => {
        cy.log('everyInternalLinkStatusOk - NCA TESTIFY');
        cy.wrap(urls).its('length').should('be.gte', minLinksRequired);
        const failedLinks = [];
        urls.forEach((url) => {
            cy.request({
                url,
                failOnStatusCode: false
            }).then((resp) => {
                var _a;
                if ((_a = resp.headers['content-type']) === null || _a === void 0 ? void 0 : _a.includes('text/html')) {
                    const validStatuses = [200, 301, 302];
                    const success = validStatuses.includes(resp.status);
                    cy.log(`${success ? '✅' : '❌'} Testing ${url}: ${resp.status}`);
                    if (!success) {
                        failedLinks.push({ url, status: resp.status });
                        cy.log(`⚠️ Link validation failed: ${url} returned ${resp.status}`);
                    }
                }
                else {
                    cy.log(`⏭️ Testing ${url}: Skipped (content-type: ${resp.headers['content-type']})`);
                }
            });
        });
        return cy.then(() => {
            expect(failedLinks).to.have.length(0, `Links with invalid status: ${failedLinks.map((l) => `${l.url} (${l.status})`).join(', ')}`);
            return null;
        });
    });
};
exports.ttEveryInternalLinkStatusOk = ttEveryInternalLinkStatusOk;
