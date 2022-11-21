"use strict";
describe("Validate NCA Tests", () => {
  it("Command internal links is ok with status 200", () => {
    cy.everyInternalLinkStatusOk();
  });
  it("Validate every page is loading", () => {
    cy.everyInternalLinkIsLoading();
  });
  it("Validate imprint is clickable", () => {
    cy.validateImprintClickable();
  });
});
