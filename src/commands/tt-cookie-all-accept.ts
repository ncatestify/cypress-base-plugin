export const ttCookieAllAcceptClick = (
  cookieButtonString: string = 'alle cookies',
) => {
  cy.log('ttCookieAllAcceptClick - NCA TESTIFY')
  return cy.contains(cookieButtonString, { matchCase: false }).click()
}
