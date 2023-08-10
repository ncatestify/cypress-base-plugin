export const ttValidateLanguageTag = () => {
    cy.log('ttValidateLanguageTag - NCA TESTIFY');
    cy.get('html').should('have.attr', 'lang');
    cy.get('html').invoke('attr', 'lang').then((langTag) => {
        cy.wrap(langTag).then((language) => {
            //@ts-ignore
            expect(language.toLowerCase()).to.contain('de');
        });
    });
};
