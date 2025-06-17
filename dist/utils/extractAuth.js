"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyAuth = exports.extractAuth = void 0;
/**
 * Extract Basic Auth credentials from a URL
 * @param url - URL string that may contain Basic Auth credentials
 * @returns Object with auth credentials or null
 */
const extractAuth = (url) => {
    try {
        const urlObj = new URL(url);
        if (urlObj.username && urlObj.password) {
            return {
                username: urlObj.username,
                password: urlObj.password
            };
        }
        return null;
    }
    catch {
        return null;
    }
};
exports.extractAuth = extractAuth;
/**
 * Apply Basic Auth credentials to a URL
 * @param url - Target URL
 * @param auth - Auth credentials
 * @returns URL with auth credentials
 */
const applyAuth = (url, auth) => {
    if (!auth)
        return url;
    try {
        const urlObj = new URL(url);
        urlObj.username = auth.username;
        urlObj.password = auth.password;
        return urlObj.toString();
    }
    catch {
        return url;
    }
};
exports.applyAuth = applyAuth;
