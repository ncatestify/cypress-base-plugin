export const ttCookieAllAcceptClick = (
  cookieButtonStrings: string[] = ['alle akzeptieren', 'alles akzeptieren']
): Cypress.Chainable<any> => {
  cy.log('ttCookieAllAcceptClick - NCA TESTIFY')
  return cy.get('body').then(($body: JQuery<HTMLBodyElement>) => {
    for (const buttonString of cookieButtonStrings) {
      if ($body.text().includes(buttonString)) {
        return cy
          .contains(buttonString, { matchCase: false })
          .click({ force: true })
      }
    }
  })
}
