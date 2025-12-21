export const ttEl = (
  selector: string,
  name?: string
): Cypress.Chainable<JQuery<HTMLElement>> => {
  cy.log(name || selector)
  return cy.get(selector)
}
