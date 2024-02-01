"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ttRunTestifyBaseTests = void 0;
//@ts-nocheck
const ttRunTestifyBaseTests = () => {
    cy.log('ttRunTestifyBaseTests - NCA TESTIFY');
    cy.ttEveryInternalLinkStatusOk();
    cy.ttValidateAllImagesResponseStatusOk();
    cy.ttValidateNoGoogleServices();
    cy.ttValidateImprintClickable();
    cy.ttEveryInternalLinkIsLoading();
    cy.ttAccessibility();
    cy.ttOnlyOneH1();
    cy.ttInvalidPath404();
    cy.ttValidateLanguageTag('de');
    cy.ttDetectHttp();
};
exports.ttRunTestifyBaseTests = ttRunTestifyBaseTests;
