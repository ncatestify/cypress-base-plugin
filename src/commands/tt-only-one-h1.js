export const ttOnlyOneH1 = () => {
    cy.log('ttOnlyOneH1 - NCA TESTIFY');
    cy.get('h1').its('length').should('eq', 1);
};
