define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ttInvalidPath404 = void 0;
    const ttInvalidPath404 = () => {
        cy.log('ttInvalidPath404 - NCA TESTIFY');
        cy.request({
            url: '/TESTIFY.invalidUrl',
            failOnStatusCode: false
        }).then((resp) => {
            assert.equal(resp.status, 404);
        });
    };
    exports.ttInvalidPath404 = ttInvalidPath404;
});
