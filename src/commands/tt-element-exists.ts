export const ttElementExists = (selector: string) => {
  cy.log('ttElementExists - NCA TESTIFY')
  return cy.window().then(($window) => $window.document.querySelector(selector))
}
