declare namespace Cypress {
  interface Chainable<Subject = any> {
    ncaGetInternalLinks<Subject>(): Chainable<string[]>;
    ncaValidateImprintClickable(): void;
    ncaEveryInternalLinkStatusOk(): void;
    ncaEveryInternalLinkIsLoading(): void;
  }
}
