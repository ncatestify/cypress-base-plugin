export const ttValidateImprintClickable = () => {
  cy.log('validateImprintClickable - NCA TESTIFY')

  cy.ttElementExists('.sg-cookie-optin-box-footer-links').then(
    (htmlElement) => {
      if (htmlElement) {
        cy.contains('.sg-cookie-optin-box-footer-links a', 'impressum', {
          matchCase: false,
        }).click()
      } else {
        cy.wait(5000)
        cy.contains('a:visible', 'impressum', { matchCase: false }).click()
      }
    },
  )
}
