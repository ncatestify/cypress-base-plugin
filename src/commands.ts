/// <reference types="cypress" />
// @ts-nocheck
import { ttEveryInternalLinkStatusOk } from './commands/tt-every-internal-link-status-ok'
import { ttValidateAllImagesResponseStatusOk } from './commands/tt-validate-all-images-response-status-ok'
import { ttEveryInternalLinkIsLoading } from './commands/tt-every-internal-link-is-loading'
import { ttGetInternalLinks } from './commands/tt-get-internal-links'
import { ttValidateImprintClickable } from './commands/tt-validate-imprint-clickable'
import { ttValidateNoGoogleServices } from './commands/tt-validate-no-google-services'
import { ttElementExists } from './commands/tt-element-exists'
import { ttRunTestifyBaseTests } from './commands/tt-run-testify-base-tests'
import { ttAccessibility } from './commands/tt-accessibility'
import { ttValidatePageContent } from './commands/tt-validate-page-content'
import { ttOnlyOneH1 } from './commands/tt-only-one-h1'
import { ttInvalidPath404 } from './commands/tt-invalid-path-404'
import { ttValidateLanguageTag } from './commands/tt-validate-language-tag'
import { ttDetectHttp } from './commands/tt-detect-http'
import { ttCookieAllAcceptClick } from './commands/tt-cookie-all-accept'
import { ttValidateAccordions } from './commands/tt-validate-accordions'

Cypress.Commands.add('ttEveryInternalLinkStatusOk', ttEveryInternalLinkStatusOk)
Cypress.Commands.add(
  'ttValidateAllImagesResponseStatusOk',
  ttValidateAllImagesResponseStatusOk
)
Cypress.Commands.add(
  'ttEveryInternalLinkIsLoading',
  ttEveryInternalLinkIsLoading
)
Cypress.Commands.add('ttElementExists', ttElementExists)
Cypress.Commands.add('ttGetInternalLinks', ttGetInternalLinks)
Cypress.Commands.add('ttValidateImprintClickable', ttValidateImprintClickable)
Cypress.Commands.add('ttValidateNoGoogleServices', ttValidateNoGoogleServices)
Cypress.Commands.add('ttRunTestifyBaseTests', ttRunTestifyBaseTests)
Cypress.Commands.add('ttAccessibility', ttAccessibility)
Cypress.Commands.add('ttValidatePageContent', ttValidatePageContent)
Cypress.Commands.add('ttOnlyOneH1', ttOnlyOneH1)
Cypress.Commands.add('ttInvalidPath404', ttInvalidPath404)
Cypress.Commands.add('ttValidateLanguageTag', ttValidateLanguageTag)
Cypress.Commands.add('ttDetectHttp', ttDetectHttp)
Cypress.Commands.add('ttCookieAllAcceptClick', ttCookieAllAcceptClick)
Cypress.Commands.add('ttValidatePageContent', ttValidatePageContent)
Cypress.Commands.add('ttOnlyOneH1', ttOnlyOneH1)
Cypress.Commands.add('ttInvalidPath404', ttInvalidPath404)
Cypress.Commands.add('ttValidateLanguageTag', ttValidateLanguageTag)
Cypress.Commands.add('ttDetectHttp', ttDetectHttp)
Cypress.Commands.add('ttCookieAllAcceptClick', ttCookieAllAcceptClick)
Cypress.Commands.add('ttValidateAccordions', ttValidateAccordions)
