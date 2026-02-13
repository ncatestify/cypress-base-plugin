"use strict";
/// <reference types="cypress" />
/// <reference path="../index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.ttValidatePageContent = void 0;
const ttValidatePageContent = () => {
    cy.ttAccessibility();
    cy.ttValidateNoGoogleServices();
    cy.ttValidateAllImagesResponseStatusOk();
    cy.ttEveryInternalLinkStatusOk();
    cy.ttEveryInternalLinkIsLoading();
    cy.ttValidateImprintClickable();
    cy.ttOnlyOneH1();
    cy.ttDetectHttp();
};
exports.ttValidatePageContent = ttValidatePageContent;
