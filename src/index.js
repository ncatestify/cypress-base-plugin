/// <reference types="Cypress" />
import { ttGetInternalLinks } from "./commands/tt-get-internal-links";
import { ttValidateImprintClickable } from "./commands/tt-validate-imprint-clickable";
import { ttEveryInternalLinkStatusOk } from "./commands/tt-every-internal-link-status-ok";
import { ttEveryInternalLinkIsLoading } from "./commands/tt-every-internal-link-is-loading";
import { ttValidateNoGoogleFonts } from "./commands/tt-validate-no-google-fonts";
Cypress.Commands.add("ttGetInternalLinks", ttGetInternalLinks);
Cypress.Commands.add("ttValidateImprintClickable", ttValidateImprintClickable);
Cypress.Commands.add("ttEveryInternalLinkStatusOk", ttEveryInternalLinkStatusOk);
Cypress.Commands.add("ttEveryInternalLinkIsLoading", ttEveryInternalLinkIsLoading);
Cypress.Commands.add("ttValidateNoGoogleFonts", ttValidateNoGoogleFonts);
