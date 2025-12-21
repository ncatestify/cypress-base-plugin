/// <reference types="cypress" />

export function resolveElementName(
  explicit: string | undefined,
  caller: string | null,
  fallback: string
): string {
  return explicit || caller || fallback
}

export abstract class BasePage {
  protected el(selector: string, name?: string) {
    cy.log(`🔹 ${resolveElementName(name, this.extractCallerName(), selector)}`)
    return cy.get(selector)
  }

  protected elContains(text: string, name?: string) {
    cy.log(`🔹 ${resolveElementName(name, this.extractCallerName(), text)}`)
    return cy.contains(text)
  }

  private extractCallerName(): string | null {
    const stack = new Error().stack
    if (!stack) return null
    return stack.split('\n')[3]?.match(/get (\w+)/)?.[1] || null
  }
}
