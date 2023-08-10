export const ttValidateLanguageTag = (language) => {
    cy.log('ttValidateLanguageTag - NCA TESTIFY');
    cy.get('html').should('have.attr', 'lang');
    cy.get('html').invoke('attr', 'lang').then((langTag) => {
        cy.wrap(langTag).then((lang) => {
            //@ts-ignore
            expect(lang.toLowerCase()).to.contain(language);
        });
    });
};
