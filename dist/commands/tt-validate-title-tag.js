"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ttValidateTitleTag = void 0;
const ttValidateTitleTag = () => {
    cy.log('ttValidateTitleTag - NCA TESTIFY');
    cy.get('head title')
        .should('exist')
        .invoke('text')
        .then((text) => {
        const trimmed = text.trim();
        expect(trimmed.length, `Title tag should not be empty, got: "${trimmed}"`).to.be.greaterThan(0);
        cy.log(`Title: "${trimmed}"`);
    });
};
exports.ttValidateTitleTag = ttValidateTitleTag;
