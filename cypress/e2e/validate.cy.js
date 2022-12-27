"use strict";
describe("Validate NCA Tests", () => {
    beforeEach(() => {
        cy.visit("/");
    });
    it("Command internal links is ok with status 200", () => {
        cy.ncaEveryInternalLinkStatusOk();
    });
    it("Validate every page is loading", () => {
        cy.ncaEveryInternalLinkIsLoading();
    });
    it("Validate imprint is clickable", () => {
        cy.ncaValidateImprintClickable();
    });
    it("Validates no google fonts are loading", () => {
        cy.ncaValidateNoGoogleFonts();
    });
});
