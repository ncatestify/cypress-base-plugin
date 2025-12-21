"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ttEl = void 0;
const ttEl = (selector, name) => {
    cy.log(name || selector);
    return cy.get(selector);
};
exports.ttEl = ttEl;
