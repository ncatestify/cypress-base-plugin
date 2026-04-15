"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ttCheckConsoleWarnings = void 0;
let warnings = [];
const ttCheckConsoleWarnings = () => {
    cy.log('ttCheckConsoleWarnings - NCA TESTIFY');
    warnings = [];
    cy.window().then((win) => {
        const originalWarn = win.console.warn;
        win.console.warn = (...args) => {
            warnings.push(args.map((a) => String(a)).join(' '));
            originalWarn.apply(win.console, args);
        };
    });
    cy.reload();
    cy.window().should('exist');
    cy.then(() => {
        if (warnings.length > 0) {
            throw new Error(`Console warnings detected (${warnings.length}):\n${warnings.join('\n')}`);
        }
        else {
            cy.log('No console warnings detected');
        }
    });
};
exports.ttCheckConsoleWarnings = ttCheckConsoleWarnings;
