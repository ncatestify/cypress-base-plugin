"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ttPageLoaded = void 0;
const ttPageLoaded = () => {
    let pendingRequests = 0;
    cy.intercept('*', (req) => {
        pendingRequests++;
        req.on('response', () => {
            pendingRequests--;
        });
    }).as('anyRequest');
    function waitForRequestsToFinish() {
        if (pendingRequests > 0) {
            cy.wait(1000).then(waitForRequestsToFinish);
        }
        else {
            cy.log('No new network requests, page considered loaded');
        }
    }
    waitForRequestsToFinish();
};
exports.ttPageLoaded = ttPageLoaded;
