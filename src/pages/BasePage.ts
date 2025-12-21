/// <reference types="cypress" />

export abstract class BasePage {
  protected el(selector: string, name?: string) {
    const logName = name || this.extractGetterName() || selector
    cy.log(logName)
    return cy.get(selector)
  }

  private extractGetterName(): string | null {
    const stack = new Error().stack
    if (!stack) return null
    return stack.split('\n')[3]?.match(/get (\w+)/)?.[1] || null
  }
}
