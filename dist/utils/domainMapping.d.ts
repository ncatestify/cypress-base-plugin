/**
 * Domain mapping configuration for staging/testing environments
 */
export interface DomainMappingConfig {
    /** Manual domain mappings: production domain -> staging domain */
    mappings?: {
        [prodDomain: string]: string;
    };
    /** Auto-detect staging patterns from baseUrl (default: true) */
    autoDetectFromBaseUrl?: boolean;
    /** Additional domains to include in link discovery */
    includedDomains?: string[];
    /** Minimum links required for validation (default: 1) */
    minLinksRequired?: number;
}
/**
 * Auto-detect domain mappings based on common staging patterns
 */
export declare const autoDetectDomainMapping: (baseUrl: string) => {
    [key: string]: string;
};
/**
 * Apply domain mapping to a URL
 */
export declare const applyDomainMapping: (url: string, config: DomainMappingConfig, baseUrl: string) => string;
/**
 * Check if URL should be included based on domain mapping config
 */
export declare const shouldIncludeUrl: (href: string, config: DomainMappingConfig, baseUrl: string) => boolean;
