"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ttValidateSubpagesAndImages = void 0;
const tt_get_internal_links_1 = require("./tt-get-internal-links");
const tt_validate_all_images_response_status_ok_1 = require("./tt-validate-all-images-response-status-ok");
const scrollTillLoaded = (loadTimeout) => {
    cy.log('Scrolling page to trigger lazy loading - NCA TESTIFY');
    const scrollToBottom = () => {
        cy.window({ log: false }).then((win) => {
            const nextScroll = win.scrollY + win.innerHeight;
            win.scrollTo(0, nextScroll);
            if (nextScroll < win.document.documentElement.scrollHeight) {
                cy.wait(300, { log: false }).then(scrollToBottom);
                return;
            }
            cy.log('Page bottom reached, waiting for lazy loading images');
            cy.get('img[src], img[srcset]', { timeout: loadTimeout }).should(($imgs) => {
                $imgs.each((_, element) => {
                    const img = element;
                    if (!img.complete || img.naturalWidth === 0) {
                        throw new Error(`Image not loaded: ${img.currentSrc ||
                            img.getAttribute('src') ||
                            img.getAttribute('srcset') ||
                            'unknown'}`);
                    }
                });
            });
        });
    };
    scrollToBottom();
};
const ttValidateSubpagesAndImages = (limit = 20, linkSelector, loadTimeout = 10000) => {
    cy.log('ttValidateSubpagesAndImages - NCA TESTIFY');
    return (0, tt_get_internal_links_1.ttGetInternalLinks)(linkSelector).then((urls) => {
        urls.slice(0, limit).forEach((url) => {
            if (!url.includes('.pdf')) {
                cy.visit(url);
                scrollTillLoaded(loadTimeout);
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
