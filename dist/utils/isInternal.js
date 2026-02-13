"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInternal = void 0;
/**
 * Default base URL fallback
 */
const DEFAULT_BASE_URL = 'https://localhost:3000';
/**
 * Extracts domain from URL, removing protocol and path
 */
const extractDomain = (url) => {
    return url.replace(/https?:\/\//, '').split('/')[0];
};
/**
 * Checks if URL is a relative path
 */
const isRelativePath = (url) => {
    return url.startsWith('/') || !url.includes('://');
};
/**
 * Gets base URL from Cypress config or environment
 */
const getBaseUrl = () => {
    if (typeof Cypress !== 'undefined') {
        return Cypress.config('baseUrl');
    }
    return process.env.BASE_URL || DEFAULT_BASE_URL;
};
/**
 * Validates if URL is internal relative to base URL
 *
 * @param url - The URL to validate
 * @returns true if URL is internal, false otherwise
 *
 * @example
 * isInternal('/path') // true - relative path
 * isInternal('page.html') // true - relative without protocol
 * isInternal('https://same-domain.com/path') // true if baseUrl matches
 * isInternal('https://other-domain.com') // false
 */
const isInternal = (url) => {
    if (isRelativePath(url)) {
        return true;
    }
    const baseUrl = getBaseUrl();
    const urlDomain = extractDomain(url);
    const baseUrlDomain = extractDomain(baseUrl);
    if (urlDomain === baseUrlDomain) {
        return true;
    }
    return url.startsWith(baseUrl);
};
exports.isInternal = isInternal;
