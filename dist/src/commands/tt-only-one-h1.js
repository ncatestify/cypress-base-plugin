"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ttOnlyOneH1 = void 0;
const ttOnlyOneH1 = () => {
    cy.log('ttOnlyOneH1 - NCA TESTIFY');
    cy.get('h1').its('length').should('eq', 1);
};
exports.ttOnlyOneH1 = ttOnlyOneH1;
