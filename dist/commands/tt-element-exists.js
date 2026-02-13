"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ttElementExists = void 0;
const ttElementExists = (selector) => {
    cy.log('ttElementExists - NCA TESTIFY');
    return cy.window().then(($window) => {
        return $window.document.querySelector(selector) !== null;
    });
};
exports.ttElementExists = ttElementExists;
