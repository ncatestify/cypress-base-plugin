"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ttSetupConsoleErrorListener = void 0;
let errors = [];
const ttSetupConsoleErrorListener = () => {
    cy.log('ttSetupConsoleErrorListener - Setup console error listener');
    // Intercept network requests
    cy.intercept('*', (req) => {
        req.continue((res) => {
            // Check for network errors
            if (res.statusCode >= 400) {
                // This is for network request errors like 404, 500, etc.
                errors.push(`Network request failed: ${res.statusCode} on ${req.url}`);
            }
            // Check for console errors
        });
        if (errors.length) {
            throw new Error(errors.join('\n'));
        }
    }).as('anyRequest');
};
exports.ttSetupConsoleErrorListener = ttSetupConsoleErrorListener;
