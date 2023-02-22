export const ttRunTestifyBaseTests = () => {
    cy.ttValidateImprintClickable();
    cy.ttEveryInternalLinkStatusOk();
    cy.ttValidateNoGoogleServices();
    cy.ttEveryInternalLinkIsLoading();
};
