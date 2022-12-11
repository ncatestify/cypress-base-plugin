"use strict";
const { defineConfig } = require("cypress");
module.exports = defineConfig({
    e2e: {
        baseUrl: "https://testify.team",
        supportFile: "cypress/support/e2e.ts",
    },
    viewportWidth: 1200,
});
