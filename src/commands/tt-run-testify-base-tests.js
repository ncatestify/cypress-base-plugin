export const ttRunTestifyBaseTests = () => {
    cy.ttValidateImprintClickable();
    cy.ttEveryInternalLinkStatusOk();
    cy.ttEveryInternalLinkIsLoading();
    cy.ttValidateNoGoogleFonts();
};
