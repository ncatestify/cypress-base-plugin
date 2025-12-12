/**
 * Extract Basic Auth credentials from a URL
 * @param url - URL string that may contain Basic Auth credentials
 * @returns Object with auth credentials or null
 */
export declare const extractAuth: (url: string) => {
    username: string;
    password: string;
} | null;
/**
 * Apply Basic Auth credentials to a URL
 * @param url - Target URL
 * @param auth - Auth credentials
 * @returns URL with auth credentials
 */
export declare const applyAuth: (url: string, auth: {
    username: string;
    password: string;
} | null) => string;
/**
 * Add baseUrl credentials to internal links using simple @ split approach
 * @param links - Array of internal link URLs
 * @param baseUrl - Base URL that may contain credentials (e.g., https://user:pass@domain.com)
 * @returns Array of links with credentials applied
 */
export declare const addCredentialsToInternalLinks: (links: string[], baseUrl?: string) => string[];
