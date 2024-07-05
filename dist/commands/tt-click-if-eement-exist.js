'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ttClickIfElementExist = void 0
// src/commands/tt-click-if-element-exist.ts
const ttClickIfElementExist = (selector) => {
  cy.log(`ttClickIfElementExist - Checking if element exists: ${selector}`)
  return cy.get('body').then(($body) => {
    if ($body.find(selector).length > 0) {
      cy.log(`Element found: ${selector}. Clicking...`)
      cy.get(selector).click()
    } else {
      cy.log(`Element not found: ${selector}. Skipping click.`)
    }
  })
}
exports.ttClickIfElementExist = ttClickIfElementExist
