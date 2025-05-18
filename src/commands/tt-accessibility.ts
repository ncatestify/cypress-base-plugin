export const ttAccessibility = (): void => {
  cy.log('ttAccessibility - NCA TESTIFY')

  // @ts-ignore - cypress-axe types
  cy.injectAxe()
  // @ts-ignore - cypress-axe types
  cy.checkA11y()
}
