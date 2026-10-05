"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ttSetupConsoleErrorListener = void 0;
let errors = [];
let listenerRegistered = false;
const collectConsoleErrors = (win) => {
    const typedWin = win;
    const originalError = typedWin.console.error;
    typedWin.console.error = (...args) => {
        errors.push(`console.error: ${args.map((arg) => String(arg)).join(' ')}`);
        originalError.apply(typedWin.console, args);
    };
    // Capture phase is required to also receive error events from
    // resource elements (img/script/link), which do not bubble
    win.addEventListener('error', (event) => {
        const target = event.target;
        if (target !== null && target !== win) {
            const element = target;
            const url = element.src || element.href;
            errors.push(`Resource error: ${element.tagName}${url ? ` ${url}` : ''}`);
            return;
        }
        const { message, filename, lineno } = event;
        const location = filename ? ` (${filename}:${lineno})` : '';
        errors.push(`Console error: ${message}${location}`);
    }, true);
    win.addEventListener('unhandledrejection', (event) => {
        const reason = event.reason instanceof Error ? event.reason.message : String(event.reason);
        errors.push(`Unhandled rejection: ${reason}`);
    });
};
const ttSetupConsoleErrorListener = () => {
    cy.log('ttSetupConsoleErrorListener - NCA TESTIFY');
    // Clear errors of a previous command call
    errors = [];
    // Collectors must be installed before any application code runs,
    // otherwise errors thrown during page load are lost. A reload
    // creates a fresh window, so window:before:load re-installs them.
    if (!listenerRegistered) {
        Cypress.on('window:before:load', collectConsoleErrors);
        listenerRegistered = true;
    }
    let pendingRequests = 0;
    cy.intercept('*', (req) => {
        pendingRequests++;
        req.on('response', (res) => {
            pendingRequests--;
            if (res.statusCode >= 400) {
                errors.push(`Network error: ${res.statusCode} - ${req.url}`);
            }
        });
    }).as('networkRequests');
    cy.reload();
    function waitForRequestsToFinish() {
        if (pendingRequests > 0) {
            // eslint-disable-next-line cypress/no-unnecessary-waiting -- polls until all intercepted requests have finished
            cy.wait(1000).then(waitForRequestsToFinish);
            return;
        }
        // eslint-disable-next-line cypress/no-unnecessary-waiting -- grace period catches errors emitted by delayed scripts (e.g. setTimeout) after load
        cy.wait(500).then(() => {
            if (errors.length) {
                throw new Error(`Errors detected:\n${errors.join('\n')}`);
            }
        });
    }
    waitForRequestsToFinish();
};
exports.ttSetupConsoleErrorListener = ttSetupConsoleErrorListener;
