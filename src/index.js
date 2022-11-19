/// <reference types="Cypress" />
import { getInternalLinks } from "./commands/get-internal-links";
import { validateImprintClickable } from "./commands/validate-imprint-clickable";
import { everyInternalLinkStatusOk } from "./commands/every-internal-link-status-ok";
import { everyInternalLinkIsLoading } from "./commands/every-internal-link-is-loading";
Cypress.Commands.add("getInternalLinks", getInternalLinks);
Cypress.Commands.add("validateImprintClickable", validateImprintClickable);
Cypress.Commands.add("everyInternalLinkStatusOk", everyInternalLinkStatusOk);
Cypress.Commands.add("everyInternalLinkIsLoading", everyInternalLinkIsLoading);
