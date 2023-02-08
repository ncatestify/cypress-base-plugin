export const ttElementExists = (selector: string) => {
  return cy.window().then(($window) => $window.document.querySelector(selector))
}
