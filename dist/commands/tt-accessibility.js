"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ttAccessibility = void 0;
const ttAccessibility = () => {
    cy.log('ttAccessibility - NCA TESTIFY');
    cy.injectAxe();
    cy.checkA11y();
};
exports.ttAccessibility = ttAccessibility;
