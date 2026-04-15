"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ttValidateMetaDescription = void 0;
const ttValidateMetaDescription = () => {
    cy.log('ttValidateMetaDescription - NCA TESTIFY');
    cy.get('head meta[name="description"]').should('exist');
    cy.get('head meta[name="description"]')
        .invoke('attr', 'content')
        .then((content) => {
        expect(content.trim().length, `Meta description should not be empty, got: "${content}"`).to.be.greaterThan(0);
        cy.log(`Meta description: "${content}"`);
    });
};
exports.ttValidateMetaDescription = ttValidateMetaDescription;
