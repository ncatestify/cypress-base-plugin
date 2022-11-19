declare namespace Cypress {
  interface Chainable<Subject = any> {
    getInternalLinks<Subject>(): Chainable<string[]>;
    validateImprintClickable(): void;
    everyInternalLinkStatusOk(): void;
    everyInternalLinkIsLoading(): void;
  }
}
