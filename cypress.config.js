"use strict";
const { defineConfig } = require("cypress");
module.exports = defineConfig({
    e2e: {
        baseUrl: "https://testify.team",
    },
    env: {
        waitForStartpage: "5000",
    },
});
