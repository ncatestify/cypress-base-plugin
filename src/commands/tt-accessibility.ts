export const ttAccessibility = (): void => {
  cy.log('ttAccessibility - NCA TESTIFY')

  cy.injectAxe()
  cy.checkA11y()
}
