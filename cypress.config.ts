const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.tagesschau.de",
    supportFile: "cypress/support/e2e.ts",
  },
  env: {
    waitForStartpage: "5000",
  },
});
