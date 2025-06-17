/// <reference types="cypress" />

interface DomainMappingConfig {
  mappings?: { [prodDomain: string]: string }
  autoDetectFromBaseUrl?: boolean
  includedDomains?: string[]
  minLinksRequired?: number
}

declare namespace Cypress {
  interface Chainable<Subject = any> {
    ttAccessibility(context?: any, options?: any): Chainable<Subject>
    ttClickIfElementExist(element: string): Chainable<Subject>
    ttCookieAllAcceptClick(): Chainable<Subject>
    ttDetectHttp(): Chainable<Subject>
    ttElementExists(element: string): Chainable<boolean>
    ttEveryInternalLinkIsLoading(limitOrConfig?: number | DomainMappingConfig, legacyConfig?: DomainMappingConfig): Chainable<Subject>
    ttEveryInternalLinkStatusOk(config?: DomainMappingConfig): Chainable<Subject>
    ttGetInternalLinks(linkSelectorOrConfig?: string | DomainMappingConfig, legacyConfig?: DomainMappingConfig): Chainable<string[]>
    ttInvalidPath404(): Chainable<Subject>
    ttOnlyOneH1(): Chainable<Subject>
    ttPageLoaded(): Chainable<Subject>
    ttSetupConsoleErrorListener(): Chainable<Subject>
    ttThreshold(threshold?: number): Chainable<Subject>
    ttValidateAllImagesResponseStatusOk(): Chainable<Subject>
    ttValidateImprintClickable(): Chainable<Subject>
    ttValidateLanguageTag(language: string): Chainable<Subject>
    ttValidateNoGoogleServices(): Chainable<Subject>
    ttValidatePageContent(): Chainable<Subject>
    ttValidateSubpagesAndImages(limit?: number, linkSelector?: string): Chainable<Subject>
  }
}

export {}