"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ttValidateAccordions = void 0;
const ttValidateAccordions = (accordionSelector, pTagSelector) => {
    cy.log('ttValidateAccordions - NCA TESTIFY');
    cy.get(accordionSelector).should('be.visible').each((accordion) => {
        cy.wrap(accordion).click().find(pTagSelector).should('be.visible');
    });
};
exports.ttValidateAccordions = ttValidateAccordions;
