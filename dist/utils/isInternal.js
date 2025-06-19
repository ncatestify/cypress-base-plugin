"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInternal = void 0;
const isInternal = (url) => {
    // Starts with / = internal
    if (url.startsWith('/')) {
        return true;
    }
    // No protocol = relative = internal
    if (!url.includes('://')) {
        return true;
    }
    // Has protocol = check if same domain as baseUrl
    const baseUrl = typeof Cypress !== 'undefined'
        ? Cypress.config('baseUrl')
        : process.env.BASE_URL || 'https://localhost:3000';
    return url.startsWith(baseUrl);
};
exports.isInternal = isInternal;
