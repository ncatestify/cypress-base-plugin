export const ttValidateImprintClickable = () => {
  cy.log("validateImprintClickable - NCA TESTIFY");
  cy.get("a").contains("Impressum").click();
};
