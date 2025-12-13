"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInternal = void 0;
/**
 * Never Code Alone configuration
 */
const NCA_CONFIG = {
    ip: '213.203.219.157',
    domains: [
        'nevercodealone.de',
        'dsv98.de',
        'projects.nevercodealone.de'
    ]
};
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
 * Parses URL into validation result
 */
const parseUrl = (url) => {
    const isRelative = isRelativePath(url);
    if (isRelative) {
        return {
            domain: '',
            protocol: null,
            isRelative: true
        };
    }
    const protocol = url.startsWith('https://')
        ? 'https'
        : url.startsWith('http://')
            ? 'http'
            : null;
    return {
        domain: extractDomain(url),
        protocol,
        isRelative: false
    };
};
/**
 * Checks if URL belongs to special NCA domain
 */
const isSpecialDomain = (url, config) => {
    return (url.includes(config.ip) ||
        config.domains.some((domain) => url.includes(domain)));
};
/**
 * Checks if domains match
 */
const doDomainsMatch = (urlDomain, baseUrlDomain) => {
    return urlDomain === baseUrlDomain;
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
    const parsed = parseUrl(url);
    // Relative paths are always internal
    if (parsed.isRelative) {
        return true;
    }
    const baseUrl = getBaseUrl();
    const baseUrlParsed = parseUrl(baseUrl);
    // Same domain check (protocol-aware by default)
    if (parsed.domain === baseUrlParsed.domain) {
        return true;
    }
    // Special handling for NCA domains with protocol mismatch
    const isNCABaseUrl = isSpecialDomain(baseUrl, NCA_CONFIG);
    const isNCAUrl = isSpecialDomain(url, NCA_CONFIG);
    if (isNCABaseUrl && isNCAUrl) {
        return doDomainsMatch(parsed.domain, baseUrlParsed.domain);
    }
    // Standard check: URL must start with base URL
    return url.startsWith(baseUrl);
};
exports.isInternal = isInternal;
