describe("Validate Testify Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Command internal links is ok with status 200", () => {
    cy.ttEveryInternalLinkStatusOk();
  });

  it("Validate every page is loading", () => {
    cy.ttEveryInternalLinkIsLoading();
  });

  it.only("Validate imprint is clickable", () => {
    cy.ttValidateImprintClickable();
  });

  it("Validates no google fonts are loading", () => {
    cy.ttValidateNoGoogleFonts();
  });
});
