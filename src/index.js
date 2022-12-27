/// <reference types="Cypress" />
import { ncaGetInternalLinks } from "./commands/nca-get-internal-links";
import { ncaValidateImprintClickable } from "./commands/nca-validate-imprint-clickable";
import { ncaEveryInternalLinkStatusOk } from "./commands/nca-every-internal-link-status-ok";
import { ncaEveryInternalLinkIsLoading } from "./commands/nca-every-internal-link-is-loading";
import { ncaValidateNoGoogleFonts } from "./commands/nca-validate-no-google-fonts";
Cypress.Commands.add("ncaGetInternalLinks", ncaGetInternalLinks);
Cypress.Commands.add("ncaValidateImprintClickable", ncaValidateImprintClickable);
Cypress.Commands.add("ncaEveryInternalLinkStatusOk", ncaEveryInternalLinkStatusOk);
Cypress.Commands.add("ncaEveryInternalLinkIsLoading", ncaEveryInternalLinkIsLoading);
Cypress.Commands.add("ncaValidateNoGoogleFonts", ncaValidateNoGoogleFonts);
