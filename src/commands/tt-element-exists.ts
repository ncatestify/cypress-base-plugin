export const ttElementExists = (
  selector: string
): Cypress.Chainable<boolean> => {
  cy.log('ttElementExists - NCA TESTIFY')
  return cy.window().then(($window) => {
    return $window.document.querySelector(selector) !== null
  })
}
