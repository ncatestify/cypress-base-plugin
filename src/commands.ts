// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { ttEveryInternalLinkStatusOk } from './commands/tt-every-internal-link-status-ok'
import { ttEveryInternalLinkIsLoading } from './commands/tt-every-internal-link-is-loading'
import { ttGetInternalLinks } from './commands/tt-get-internal-links'
import { ttValidateImprintClickable } from './commands/tt-validate-imprint-clickable'
import { ttValidateNoGoogleFonts } from './commands/tt-validate-no-google-fonts'
import { ttElementExists } from './commands/tt-element-exists'
import { ttRunTestifyBaseTests } from './commands/tt-run-testify-base-tests'

Cypress.Commands.add('ttEveryInternalLinkStatusOk', ttEveryInternalLinkStatusOk)
Cypress.Commands.add(
  'ttEveryInternalLinkIsLoading',
  ttEveryInternalLinkIsLoading,
)
Cypress.Commands.add('ttGetInternalLinks', ttGetInternalLinks)
Cypress.Commands.add('ttValidateImprintClickable', ttValidateImprintClickable)
Cypress.Commands.add('ttValidateNoGoogleFonts', ttValidateNoGoogleFonts)

Cypress.Commands.add('ttElementExists', ttElementExists)
Cypress.Commands.add('ttRunTestifyBaseTests', ttRunTestifyBaseTests)
