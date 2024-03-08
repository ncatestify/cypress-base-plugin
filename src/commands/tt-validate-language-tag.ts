export const ttValidateLanguageTag = (language: string = 'de'): void => {
  cy.log('ttValidateLanguageTag - NCA TESTIFY')
  cy.get('html').should('have.attr', 'lang')
  cy.get('html')
    .invoke('attr', 'lang')
    .then((langTag) => {
      cy.wrap(langTag).then((lang) => {
        expect(lang.toLowerCase()).to.contain(language)
      })
    })
}
