export const ttValidateImprintClickable = () => {
    let oneLinkIsClickable = false;
    cy.log("validateImprintClickable - NCA TESTIFY");
    cy.contains("a:visible", "mpressum", { matchCase: false }).click();
};
