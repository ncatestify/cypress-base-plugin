const extractCallerName = (): string | null => {
  const stack = new Error().stack
  if (!stack) return null
  const lines = stack.split('\n')
  for (const line of lines) {
    const match = line.match(/get (\w+)/)
    if (match) return match[1]
  }
  return null
}

export const ttEl = (
  selector: string,
  name?: string
): Cypress.Chainable<JQuery<HTMLElement>> => {
  const logName = name || extractCallerName() || selector
  cy.log(logName)
  return cy.get(selector)
}
