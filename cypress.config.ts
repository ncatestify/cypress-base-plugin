import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    supportFile: 'cypress/support/e2e.ts',
    setupNodeEvents(on, config) {
      return config
    }
  },
  viewportWidth: 1200
})
