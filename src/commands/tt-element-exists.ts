export const ttElementExists = (selector: string): boolean => {
  cy.log('ttElementExists - NCA TESTIFY')
  cy.window().then(($window) => { return $window.document.querySelector(selector) })
}
