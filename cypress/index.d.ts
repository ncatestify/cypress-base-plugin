declare namespace Cypress {
  interface Chainable<Subject = any> {
    ttAccessibility(context?: any, options?: any): Chainable<Subject>
    ttCookieAllAcceptClick(): void
    ttDetectHttp(): void
    ttElementExists(element: string): boolean
    ttEveryInternalLinkIsLoading(): void
    ttEveryInternalLinkStatusOk(): void
    ttGetInternalLinks<Subject>(): Chainable<string[]>
    ttInvalidPath404(): void
    ttOnlyOneH1(): void
    ttRunTestifyBaseTests(): void
    ttValidateAllImagesResponseStatusOk(): void
    ttValidateImprintClickable(): void
    ttValidateLanguageTag(language: string): void
    ttValidateNoGoogleServices(): void
    ttValidateSubpagesAndImages(limit?: number, linkSelector?: string): void
    ttValidatePageContent(): void
  }
}
