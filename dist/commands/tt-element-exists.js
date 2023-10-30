export const ttElementExists = (selector) => {
    cy.log('ttElementExists - NCA TESTIFY');
    return cy.window().then(($window) => {
        return $window.document.querySelector(selector) !== null;
    });
};
