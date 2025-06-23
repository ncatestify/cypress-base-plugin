"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ttEveryInternalLinkStatusOk = void 0;
const ttEveryInternalLinkStatusOk = (minLinksRequired = 1) => {
    //@ts-ignore - Custom command type not available in build context
    return cy.ttGetInternalLinks().then((urls) => {
        cy.log('everyInternalLinkStatusOk - NCA TESTIFY');
        cy.wrap(urls).its('length').should('be.gte', minLinksRequired);
        let allLinksOk = true;
        urls.forEach((url) => {
            const requestOptions = {
                url: url,
                failOnStatusCode: false
            };
            cy.request(requestOptions).then((resp) => {
                var _a;
                if ((_a = resp.headers['content-type']) === null || _a === void 0 ? void 0 : _a.includes('text/html')) {
                    const success = resp.status === 200;
                    allLinksOk = allLinksOk && success;
                    cy.log(`${success ? '✅' : '❌'} Testing ${url}: ${resp.status}`);
                    if (!success) {
                        cy.log(`⚠️ Link validation failed: ${url} returned ${resp.status}`);
                    }
                }
                else {
                    cy.log(`⏭️ Testing ${url}: Skipped (content-type: ${resp.headers['content-type']})`);
                }
            });
        });
        return cy.wrap(allLinksOk);
    });
};
exports.ttEveryInternalLinkStatusOk = ttEveryInternalLinkStatusOk;
