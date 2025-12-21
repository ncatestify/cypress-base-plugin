/// <reference types="cypress" />
// @ts-nocheck - Cypress commands registration bypasses TypeScript checking
import { ttAccessibility } from './commands/tt-accessibility'
import { ttClickIfElementExist } from './commands/tt-click-if-element-exist'
import { ttCookieAllAcceptClick } from './commands/tt-cookie-all-accept'
import { ttDetectHttp } from './commands/tt-detect-http'
import { ttElementExists } from './commands/tt-element-exists'
import { ttEveryInternalLinkIsLoading } from './commands/tt-every-internal-link-is-loading'
import { ttEveryInternalLinkStatusOk } from './commands/tt-every-internal-link-status-ok'
import { ttGetInternalLinks } from './commands/tt-get-internal-links'
import { ttInvalidPath404 } from './commands/tt-invalid-path-404'
import { ttOnlyOneH1 } from './commands/tt-only-one-h1'
import { ttPageLoaded } from './commands/tt-page-loaded'
import { ttSetupConsoleErrorListener } from './commands/tt-setup-console-error-listener'
import { ttThreshold } from './commands/tt-threshold'
import { ttValidateAllImagesResponseStatusOk } from './commands/tt-validate-all-images-response-status-ok'
import { ttValidateImprintClickable } from './commands/tt-validate-imprint-clickable'
import { ttValidateLanguageTag } from './commands/tt-validate-language-tag'
import { ttValidateNoGoogleServices } from './commands/tt-validate-no-google-services'
import { ttValidatePageContent } from './commands/tt-validate-page-content'
import { ttValidateSubpagesAndImages } from './commands/tt-validate-subpages-and-images'
import { ttEl } from './commands/tt-el'

Cypress.Commands.add('ttEl', ttEl)
Cypress.Commands.add('ttAccessibility', ttAccessibility)
Cypress.Commands.add('ttClickIfElementExist', ttClickIfElementExist)
Cypress.Commands.add('ttCookieAllAcceptClick', ttCookieAllAcceptClick)
Cypress.Commands.add('ttDetectHttp', ttDetectHttp)
Cypress.Commands.add('ttElementExists', ttElementExists)
Cypress.Commands.add(
  'ttEveryInternalLinkIsLoading',
  ttEveryInternalLinkIsLoading
)
Cypress.Commands.add('ttEveryInternalLinkStatusOk', ttEveryInternalLinkStatusOk)
Cypress.Commands.add('ttGetInternalLinks', ttGetInternalLinks)
Cypress.Commands.add('ttInvalidPath404', ttInvalidPath404)
Cypress.Commands.add('ttOnlyOneH1', ttOnlyOneH1)
Cypress.Commands.add('ttPageLoaded', ttPageLoaded)
Cypress.Commands.add('ttSetupConsoleErrorListener', ttSetupConsoleErrorListener)
Cypress.Commands.add('ttThreshold', ttThreshold)
Cypress.Commands.add(
  'ttValidateAllImagesResponseStatusOk',
  ttValidateAllImagesResponseStatusOk
)
Cypress.Commands.add('ttValidateImprintClickable', ttValidateImprintClickable)
Cypress.Commands.add('ttValidateLanguageTag', ttValidateLanguageTag)
Cypress.Commands.add('ttValidateNoGoogleServices', ttValidateNoGoogleServices)
Cypress.Commands.add('ttValidatePageContent', ttValidatePageContent)
Cypress.Commands.add('ttValidateSubpagesAndImages', ttValidateSubpagesAndImages)
