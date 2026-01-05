'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ttEl = void 0
const extractCallerName = () => {
  const stack = new Error().stack
  if (!stack) return null
  const lines = stack.split('\n')
  for (const line of lines) {
    const match = line.match(/get (\w+)/)
    if (match) return match[1]
  }
  return null
}
const ttEl = (selector, name) => {
  const logName = name || extractCallerName() || selector
  cy.log(logName)
  return cy.get(selector)
}
exports.ttEl = ttEl
