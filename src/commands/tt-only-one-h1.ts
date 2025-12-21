export const ttOnlyOneH1 = () => {
  cy.log('ttOnlyOneH1 - NCA TESTIFY')
  // @ts-ignore - Custom command registered at runtime
  cy.ttEl('h1', 'h1Heading').its('length').should('eq', 1)
}
