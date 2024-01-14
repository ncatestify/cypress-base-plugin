const { defineConfig } = require('cypress');
module.exports = defineConfig({
    e2e: {
        baseUrl: 'http://localhost:8080',
        supportFile: 'cypress/support/e2e.ts'
    },
    viewportWidth: 1200
});
