declare namespace Cypress {
  interface Chainable<Subject = any> {
    ttGetInternalLinks<Subject>(): Chainable<string[]>;
    ttValidateImprintClickable(): void;
    ttEveryInternalLinkStatusOk(): void;
    ttEveryInternalLinkIsLoading(): void;
    ttValidateNoGoogleFonts(): void;
    elementExists(element: string): Chainable<Subject>;
  }
}
