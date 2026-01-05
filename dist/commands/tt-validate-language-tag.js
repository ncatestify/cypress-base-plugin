'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ttValidateLanguageTag = void 0
const ttValidateLanguageTag = (language = 'de') => {
  cy.log('ttValidateLanguageTag - NCA TESTIFY')
  // @ts-ignore - Custom command registered at runtime
  cy.ttEl('html', 'htmlElement').should('have.attr', 'lang')
  // @ts-ignore - Custom command registered at runtime
  cy.ttEl('html', 'htmlElement')
    .invoke('attr', 'lang')
    .then((langTag) => {
      expect(langTag.toLowerCase()).to.contain(language)
    })
}
exports.ttValidateLanguageTag = ttValidateLanguageTag
