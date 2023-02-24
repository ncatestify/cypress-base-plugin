declare namespace Cypress {
  interface Chainable<Subject = any> {
    ttGetInternalLinks<Subject>(): Chainable<string[]>
    ttValidateImprintClickable(): void
    ttEveryInternalLinkStatusOk(): void
    ttEveryInternalLinkIsLoading(): void
    ttValidateNoGoogleServices(): void
    ttElementExists(element: string): Chainable<Subject>
    ttRunTestifyBaseTests(): void
  }
}
