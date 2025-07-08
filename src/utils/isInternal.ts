/**
 * Type definitions for URL validation
 */
type URLString = string
type Domain = string
type Protocol = 'http' | 'https'

/**
 * Configuration for special case domains
 */
interface SpecialDomainConfig {
  readonly ip: string
  readonly domains: readonly string[]
}

/**
 * URL validation result with metadata
 */
interface URLValidationResult {
  readonly domain: Domain
  readonly protocol: Protocol | null
  readonly isRelative: boolean
}

/**
 * Never Code Alone configuration
 */
const NCA_CONFIG: SpecialDomainConfig = {
  ip: '213.203.219.157',
  domains: ['nevercodealone.de', 'dsv98.de', 'projects.nevercodealone.de'] as const
} as const

/**
 * Default base URL fallback
 */
const DEFAULT_BASE_URL = 'https://localhost:3000' as const

/**
 * Extracts domain from URL, removing protocol and path
 */
const extractDomain = (url: URLString): Domain => {
  return url.replace(/https?:\/\//, '').split('/')[0]
}

/**
 * Checks if URL is a relative path
 */
const isRelativePath = (url: URLString): boolean => {
  return url.startsWith('/') || !url.includes('://')
}

/**
 * Gets base URL from Cypress config or environment
 */
const getBaseUrl = (): URLString => {
  if (typeof Cypress !== 'undefined') {
    return Cypress.config('baseUrl')
  }
  return process.env.BASE_URL || DEFAULT_BASE_URL
}

/**
 * Parses URL into validation result
 */
const parseUrl = (url: URLString): URLValidationResult => {
  const isRelative = isRelativePath(url)
  
  if (isRelative) {
    return {
      domain: '',
      protocol: null,
      isRelative: true
    }
  }
  
  const protocol = url.startsWith('https://') ? 'https' : 
                   url.startsWith('http://') ? 'http' : null
  
  return {
    domain: extractDomain(url),
    protocol,
    isRelative: false
  }
}

/**
 * Checks if URL belongs to special NCA domain
 */
const isSpecialDomain = (url: URLString, config: SpecialDomainConfig): boolean => {
  return url.includes(config.ip) || 
         config.domains.some(domain => url.includes(domain))
}

/**
 * Checks if domains match, optionally ignoring protocol
 */
const doDomainsMatch = (
  urlDomain: Domain, 
  baseUrlDomain: Domain, 
  ignoreProtocol: boolean = false
): boolean => {
  return urlDomain === baseUrlDomain
}

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
export const isInternal = (url: URLString): boolean => {
  const parsed = parseUrl(url)
  
  // Relative paths are always internal
  if (parsed.isRelative) {
    return true
  }
  
  const baseUrl = getBaseUrl()
  const baseUrlParsed = parseUrl(baseUrl)
  
  // Same domain check (protocol-aware by default)
  if (parsed.domain === baseUrlParsed.domain) {
    return true
  }
  
  // Special handling for NCA domains with protocol mismatch
  const isNCABaseUrl = isSpecialDomain(baseUrl, NCA_CONFIG)
  const isNCAUrl = isSpecialDomain(url, NCA_CONFIG)
  
  if (isNCABaseUrl && isNCAUrl) {
    return doDomainsMatch(parsed.domain, baseUrlParsed.domain, true)
  }
  
  // Standard check: URL must start with base URL
  return url.startsWith(baseUrl)
}