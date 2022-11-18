"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInternalLinks = void 0;
var getInternalLinks = function () {
    var listOfResults = [];
    cy.get("a").each(function (resultItem) {
        var singleResult = "";
        //Retrive Title
        cy.wrap(resultItem)
            .invoke("attr", "href")
            .then(function (href) {
            if (isInternal(href) &&
                typeof href !== "undefined" &&
                href.indexOf("mailto") == -1 &&
                href.indexOf("tel") == -1 &&
                Cypress._.indexOf(listOfResults, href) == -1) {
                singleResult = href;
            }
            else {
                cy.log("Filtered URL: " + href);
            }
        });
        cy.then(function () {
            if (singleResult.length) {
                listOfResults.push(singleResult);
            }
        });
    });
    return cy.wrap(listOfResults);
};
exports.getInternalLinks = getInternalLinks;
function isInternal(url) {
    return url.startsWith("/") || url.includes(Cypress.env("baseUrl"));
}
