export const ttCookieAllAcceptClick = (
  cookieButtonStrings = ['alle akzeptieren', 'alles akzeptieren']
) => {
  cy.log('ttCookieAllAcceptClick - NCA TESTIFY')
  return cy.get('body').then(($body) => {
    for (const buttonString of cookieButtonStrings) {
      if ($body.text().includes(buttonString)) {
        return cy
          .contains(buttonString, { matchCase: false })
          .click({ force: true })
      }
    }
  })
}
