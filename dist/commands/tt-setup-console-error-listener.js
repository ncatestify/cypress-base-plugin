'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ttSetupConsoleErrorListener = void 0
let errors = []
const ttSetupConsoleErrorListener = () => {
  cy.log('ttSetupConsoleErrorListener - Setting up error listener')
  // Clear previous errors
  errors = []
  // Attach error event listener to the window object
  cy.window().then((win) => {
    win.addEventListener('error', (event) => {
      errors.push(`Console error: ${event.message}`)
    })
  })
  // Intercept network requests
  cy.intercept('*', (req) => {
    req.continue((res) => {
      // Check for network errors
      if (res.statusCode >= 400) {
        errors.push(`Network error: ${res.statusCode} - ${req.url}`)
      }
    })
  }).as('networkRequests')
  // Reload the page
  cy.reload()
  // Wait for the page to load and stabilize
  cy.window().should('exist')
  // Check for errors after the page load
  cy.then(() => {
    if (errors.length) {
      throw new Error(`Errors detected:\n${errors.join('\n')}`)
    }
  })
}
exports.ttSetupConsoleErrorListener = ttSetupConsoleErrorListener
