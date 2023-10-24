export const ttCookieAllAcceptClick = (
  cookieButtonString: string = 'alle akzeptieren',
) => {
  cy.log('ttCookieAllAcceptClick - NCA TESTIFY')
  return cy.contains(cookieButtonString, { matchCase: false}).click({force: true}) 
}
