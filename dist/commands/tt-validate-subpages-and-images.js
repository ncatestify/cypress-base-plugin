"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ttValidateSubpagesAndImages = void 0;
const tt_get_internal_links_1 = require("./tt-get-internal-links");
const tt_validate_all_images_response_status_ok_1 = require("./tt-validate-all-images-response-status-ok");
const ttValidateSubpagesAndImages = (limit = 20, linkSelector) => {
    cy.log('ttValidateSubpagesAndImages - NCA TESTIFY');
    return (0, tt_get_internal_links_1.ttGetInternalLinks)(linkSelector).then((urls) => {
        urls.slice(0, limit).forEach((url) => {
            if (!url.includes('.pdf')) {
                cy.visit(url);
                (0, tt_validate_all_images_response_status_ok_1.ttValidateAllImagesResponseStatusOk)(url);
            }
            else {
                cy.log('PDF detected' + url);
            }
            cy.clearAllLocalStorage();
        });
        return null;
    });
};
exports.ttValidateSubpagesAndImages = ttValidateSubpagesAndImages;
