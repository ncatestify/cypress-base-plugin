"use strict";
describe('Validate Testify Tests', () => {
    beforeEach(() => {
        cy.visit('/');
    });
    it('Runs Testify base tests', () => {
        //cy.ttEveryInternalLinkStatusOk()
        //cy.ttValidateImprintClickable()
        //cy.ttValidateNoGoogleServices()
        //cy.ttValidateAllImagesResponseStatusOk()
        cy.ttRunTestifyBaseTests();
    });
});
