"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ttInvalidPath404 = void 0;
const extractAuth_1 = require("./../utils/extractAuth");
const ttInvalidPath404 = () => {
    cy.log('ttInvalidPath404 - NCA TESTIFY');
    const baseUrl = Cypress.config('baseUrl');
    const auth = (0, extractAuth_1.extractAuth)(baseUrl);
    const requestOptions = {
        url: '/TESTIFY.invalidUrl',
        failOnStatusCode: false
    };
    if (auth) {
        requestOptions.auth = {
            username: auth.username,
            password: auth.password
        };
    }
    cy.request(requestOptions).then((resp) => {
        assert.equal(resp.status, 404);
    });
};
exports.ttInvalidPath404 = ttInvalidPath404;
