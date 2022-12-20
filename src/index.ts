/// <reference types="Cypress" />

import { getInternalLinks } from "./commands/nca-get-internal-links";
import { validateImprintClickable } from "./commands/nca-validate-imprint-clickable";
import { everyInternalLinkStatusOk } from "./commands/nca-every-internal-link-status-ok";
import { everyInternalLinkIsLoading } from "./commands/nca-every-internal-link-is-loading";

Cypress.Commands.add("getInternalLinks", getInternalLinks);
Cypress.Commands.add("validateImprintClickable", validateImprintClickable);
Cypress.Commands.add("everyInternalLinkStatusOk", everyInternalLinkStatusOk);
Cypress.Commands.add("everyInternalLinkIsLoading", everyInternalLinkIsLoading);
