export const ttElementExists = (selector) => {
    cy.log('ttElementExists - NCA TESTIFY');
    return cy.window().then(($window) => $window.document.querySelector(selector));
};
