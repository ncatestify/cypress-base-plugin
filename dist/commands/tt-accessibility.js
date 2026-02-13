"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ttAccessibility = void 0;
const ttAccessibility = () => {
    cy.log('ttAccessibility - NCA TESTIFY');
    // @ts-ignore - cypress-axe types
    cy.injectAxe();
    // @ts-ignore - cypress-axe types
    cy.checkA11y();
};
exports.ttAccessibility = ttAccessibility;
