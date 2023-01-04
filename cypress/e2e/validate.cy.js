"use strict";
describe("Validate Testify Tests", () => {
    beforeEach(() => {
        cy.visit("/");
    });
    it("Validate imprint is clickable", () => {
        cy.ttValidateImprintClickable();
    });
    it("Command internal links is ok with status 200", () => {
        cy.ttEveryInternalLinkStatusOk();
    });
    it("Validate every page is loading", () => {
        cy.ttEveryInternalLinkIsLoading();
    });
    it("Validates no google fonts are loading", () => {
        cy.ttValidateNoGoogleFonts();
    });
});
