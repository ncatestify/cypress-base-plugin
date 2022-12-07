export const everyInternalLinkIsLoading = () => {
  cy.getInternalLinks().then((urls: Array<string>) => {
    cy.log("everyInternalLinkIsLoading - NCA TESTIFY");
    cy.getInternalLinks().then((urls: Array<string>) => {
      urls.forEach((url) => {
        if (!url.includes(".pdf")) {
          cy.visit(url);
          cy.get("a").should("be.visible");
        } else {
          cy.log("PDF detected" + url);
        }
      });
    });
  });
};
