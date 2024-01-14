// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
define(["require", "exports", "cypress-axe", "./../../src/commands"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Cypress.on('uncaught:exception', (_err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false;
    });
});
