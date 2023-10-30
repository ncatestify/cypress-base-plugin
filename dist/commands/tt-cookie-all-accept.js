export const ttCookieAllAcceptClick = (cookieButtonString = 'alle akzeptieren') => {
    cy.log('ttCookieAllAcceptClick - NCA TESTIFY');
    return cy
        .contains(cookieButtonString, { matchCase: false })
        .click({ force: true });
};
