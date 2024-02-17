"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ttSetupConsoleErrorListener = void 0;
const ttSetupConsoleErrorListener = () => {
    cy.log('ttSetupConsoleErrorListener - Setup console error listener');
    cy.on('uncaught:exception', (err, runnable) => {
        expect(err.message).to.include('expected error message');
        return false;
    });
};
exports.ttSetupConsoleErrorListener = ttSetupConsoleErrorListener;
