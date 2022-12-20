export const ncaValidateImprintClickable = () => {
    cy.log("validateImprintClickable - NCA TESTIFY");
    cy.get("a").contains("Impressum").click();
};
