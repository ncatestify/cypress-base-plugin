const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://adesso.de",
    supportFile: "cypress/support/e2e.ts",
  },
  env: {
    waitForStartpage: "5000",
  },
});
