export const ttElementExists = (selector) => {
    cy.log('ttElementExists - NCA TESTIFY');
    cy.window().then(($window) => {
        return $window.document.querySelector(selector);
    });
};
