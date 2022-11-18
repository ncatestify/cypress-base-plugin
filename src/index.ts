/// <reference types="Cypress" />

import { getInternalLinks } from "./commands/get-internal-links";

Cypress.Commands.add("getInternalLinks", getInternalLinks);
