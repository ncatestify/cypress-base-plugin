declare namespace Cypress {
  interface Chainable<Subject = any> {
    ttGetInternalLinks(excludeSelector?: string): Chainable<string[]>
    ttValidateImprintClickable(): void
    ttValidateSubpagesAndImages(limit?: number, linkSelector?: string): void
    ttEveryInternalLinkStatusOk(): void
    ttEveryInternalLinkIsLoading(): void
    ttValidateNoGoogleServices(): void
    ttElementExists(element: string): boolean
    ttRunTestifyBaseTests(): void
    ttValidateAllImagesResponseStatusOk(): void
    ttAccessibility(context?: any, options?: any): Chainable<Subject>
    ttValidatePageContent(): void
    ttOnlyOneH1(): void
    ttInvalidPath404(): void
    ttValidateLanguageTag(language?: string): void
    ttDetectHttp(): void
    ttCookieAllAcceptClick(): void
    ttThreshold(): void
    ttConsoleErrors(): void
    ttPageLoaded(): void
  }
}
