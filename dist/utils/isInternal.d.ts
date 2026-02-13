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
export declare const isInternal: (url: string) => boolean;
