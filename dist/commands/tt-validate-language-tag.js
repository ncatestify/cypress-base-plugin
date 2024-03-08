"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ttValidateLanguageTag = void 0;
const ttValidateLanguageTag = (language = 'de') => {
    cy.log('ttValidateLanguageTag - NCA TESTIFY');
    cy.get('html').should('have.attr', 'lang');
    cy.get('html')
        .invoke('attr', 'lang')
        .then((langTag) => {
        cy.wrap(langTag).then((lang) => {
            expect(lang.toLowerCase()).to.contain(language);
        });
    });
};
exports.ttValidateLanguageTag = ttValidateLanguageTag;
