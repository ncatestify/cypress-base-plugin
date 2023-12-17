export const ttAccessibility = () => {
    cy.log('ttAccessibility - NCA TESTIFY');
    cy.injectAxe();
    cy.checkA11y();
};
