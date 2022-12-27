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
import { ncaEveryInternalLinkStatusOk } from "./commands/nca-every-internal-link-status-ok";
import { ncaEveryInternalLinkIsLoading } from "./commands/nca-every-internal-link-is-loading";
import { ncaGetInternalLinks } from "./commands/nca-get-internal-links";
import { ncaValidateImprintClickable } from "./commands/nca-validate-imprint-clickable";
import { ncaValidateNoGoogleFonts } from "./commands/nca-validate-no-google-fonts";
Cypress.Commands.add("ncaEveryInternalLinkStatusOk", ncaEveryInternalLinkStatusOk);
Cypress.Commands.add("ncaEveryInternalLinkIsLoading", ncaEveryInternalLinkIsLoading);
Cypress.Commands.add("ncaGetInternalLinks", ncaGetInternalLinks);
Cypress.Commands.add("ncaValidateImprintClickable", ncaValidateImprintClickable);
Cypress.Commands.add("ncaValidateNoGoogleFonts", ncaValidateNoGoogleFonts);
