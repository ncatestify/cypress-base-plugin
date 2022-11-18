declare namespace Cypress {
  interface Chainable<Subject = any> {
    getInternalLinks<Subject>(): Chainable<Subject>;
    validateImprintClickable(): void;
    everyInternalLinkStatusOk(): void;
    everyInternalLinkStatusIsLoading(): void;
  }
}
