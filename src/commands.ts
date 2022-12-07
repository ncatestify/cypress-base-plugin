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

import { everyInternalLinkStatusOk } from "./commands/every-internal-link-status-ok";
import { everyInternalLinkIsLoading } from "./commands/every-internal-link-is-loading";
import { getInternalLinks } from "./commands/get-internal-links";
import { validateImprintClickable } from "./commands/validate-imprint-clickable";

Cypress.Commands.add("everyInternalLinkStatusOk", everyInternalLinkStatusOk);
Cypress.Commands.add("everyInternalLinkIsLoading", everyInternalLinkIsLoading);
Cypress.Commands.add("getInternalLinks", getInternalLinks);
Cypress.Commands.add("validateImprintClickable", validateImprintClickable);
