define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isInternal = void 0;
    const isInternal = (url) => {
        const baseUrl = new URL(Cypress.config('baseUrl'));
        const urlToCheck = new URL(url, baseUrl.href);
        return urlToCheck.origin === baseUrl.origin;
    };
    exports.isInternal = isInternal;
});
