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
 * Add baseUrl credentials to internal links
 * @param links - Array of internal link URLs
 * @param baseUrl - Base URL that may contain credentials (e.g., https://user:pass@domain.com)
 * @returns Array of links with credentials applied
 */
export declare const addCredentialsToInternalLinks: (links: string[], baseUrl?: string) => string[];
/**
 * Extract Basic Auth credentials from the baseUrl for a target URL.
 * Credentials are only returned when the baseUrl contains credentials and
 * the target URL belongs to the baseUrl host (without credentials).
 * External URLs never receive credentials.
 *
 * @param url - Target URL (e.g. an image URL)
 * @param baseUrl - Base URL that may contain credentials (e.g. https://user:pass@domain.com)
 * @returns Object with auth credentials for internal URLs or null
 */
export declare const extractAuthForUrl: (url: string, baseUrl?: string) => {
    username: string;
    password: string;
} | null;
