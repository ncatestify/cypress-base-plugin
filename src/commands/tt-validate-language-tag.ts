export const ttValidateLanguageTag = (language: string = 'de'): void => {
  cy.log('ttValidateLanguageTag - NCA TESTIFY')
  // @ts-ignore - Custom command registered at runtime
  cy.ttEl('html', 'htmlElement').should('have.attr', 'lang')
  // @ts-ignore - Custom command registered at runtime
  cy.ttEl('html', 'htmlElement')
    .invoke('attr', 'lang')
    .then((langTag: string) => {
      expect(langTag.toLowerCase()).to.contain(language)
    })
}
