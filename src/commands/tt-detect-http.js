"use strict";
exports.__esModule = true;
exports.ttDetectHttp = void 0;
var chai_1 = require("chai");
var ttDetectHttp = function () {
    cy.log('ttDetectHttp - NCA TESTIFY');
    cy.get('a').each(function (resultItem) {
        cy.wrap(resultItem)
            .invoke('attr', 'href')
            .then(function (href) {
            if (typeof href !== 'undefined' &&
                !href.includes('mailto') &&
                !href.includes('tel')) {
                chai_1.assert.notInclude(href, 'http:');
            }
            else {
                cy.log("Filtered URL: ".concat(href));
            }
        });
    });
};
exports.ttDetectHttp = ttDetectHttp;
