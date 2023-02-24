export const ttRunTestifyBaseTests = () => {
    cy.log('ttRunTestifyBaseTests - NCA TESTIFY');
    cy.ttValidateImprintClickable();
    cy.ttEveryInternalLinkStatusOk();
    cy.ttValidateNoGoogleServices();
    cy.ttEveryInternalLinkIsLoading();
};
