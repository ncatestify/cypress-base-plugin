export const ttValidateImprintClickable = () => {
  let oneLinkIsClickable = false;
  cy.log("validateImprintClickable - NCA TESTIFY");
  cy.wait(5000);
  cy.contains("a:visible", "impressum", { matchCase: false }).click();
};
