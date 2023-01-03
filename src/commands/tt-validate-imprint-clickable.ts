export const ttValidateImprintClickable = () => {
  let oneLinkIsClickable = false;
  cy.log("validateImprintClickable - NCA TESTIFY");

  cy.elementExists(".sg-cookie-optin-box-footer-links").then((confirmBtn) => {
    if (confirmBtn) {
      cy.contains(".sg-cookie-optin-box-footer-links a", "impressum", {
        matchCase: false,
      }).click();
    } else {
      cy.contains("a:visible", "impressum", { matchCase: false }).click();
    }
  });
};
