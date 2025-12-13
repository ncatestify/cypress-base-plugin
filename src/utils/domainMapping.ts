/**
 * Domain mapping configuration for staging/testing environments
 */
export interface DomainMappingConfig {
  /** Manual domain mappings: production domain -> staging domain */
  mappings?: { [prodDomain: string]: string }
  /** Auto-detect staging patterns from baseUrl (default: true) */
  autoDetectFromBaseUrl?: boolean
  /** Additional domains to include in link discovery */
  includedDomains?: string[]
  /** Minimum links required for validation (default: 1) */
  minLinksRequired?: number
}

/**
 * Auto-detect domain mappings based on common staging patterns
 */
export const autoDetectDomainMapping = (
  baseUrl: string
): { [key: string]: string } => {
  const mapping: { [key: string]: string } = {}

  try {
    const baseUrlObj = new URL(baseUrl)
    const hostname = baseUrlObj.hostname

    // Common staging patterns
    const stagingPatterns = [
      'staging',
      'test',
      'testing',
      'dev',
      'development',
      'demo',
      'qa',
      'uat',
      'preview',
      'beta',
      'testingcrud'
    ]

    // Check if this looks like a staging domain
    const looksLikeStaging = stagingPatterns.some((pattern) =>
      hostname.toLowerCase().includes(pattern.toLowerCase())
    )

    if (looksLikeStaging) {
      // Special handling for complex patterns like "testingcrud.testify.projects.nevercodealone.de"
      if (hostname.includes('testingcrud.testify.projects.nevercodealone.de')) {
        mapping['nevercodealone.de'] = hostname
      }
      // Handle other common patterns
      else {
        let prodDomain = hostname

        // Remove common staging prefixes/subdomains
        stagingPatterns.forEach((pattern) => {
          prodDomain = prodDomain
            .replace(new RegExp(`^${pattern}\\.`, 'i'), '')
            .replace(new RegExp(`\\.${pattern}\\.`, 'i'), '.')
            .replace(new RegExp(`${pattern}-`, 'i'), '')
            .replace(new RegExp(`-${pattern}`, 'i'), '')
            .replace(new RegExp(`${pattern}`, 'gi'), '')
        })

        // Clean up domain to get production equivalent
        const parts = prodDomain.split('.')
        if (parts.length > 2) {
          prodDomain = parts.slice(-2).join('.')
        }

        prodDomain = prodDomain.replace(/^\.+|\.+$/g, '').replace(/\.+/g, '.')

        if (prodDomain && prodDomain !== hostname && prodDomain.includes('.')) {
          mapping[prodDomain] = hostname
        }
      }
    }
  } catch (error) {
    console.warn('Could not auto-detect domain mapping:', error)
  }

  return mapping
}

/**
 * Apply domain mapping to a URL
 */
export const applyDomainMapping = (
  url: string,
  config: DomainMappingConfig,
  baseUrl: string
): string => {
  let mappedUrl = url

  // Get all mappings (manual + auto-detected)
  const autoMappings =
    config.autoDetectFromBaseUrl !== false
      ? autoDetectDomainMapping(baseUrl)
      : {}
  const allMappings = { ...autoMappings, ...config.mappings }

  // Apply domain mappings
  Object.keys(allMappings).forEach((prodDomain) => {
    const stagingDomain = allMappings[prodDomain]
    if (url.includes(prodDomain) && !url.includes(stagingDomain)) {
      mappedUrl = url.replace(prodDomain, stagingDomain)
    }
  })

  return mappedUrl
}

/**
 * Check if URL should be included based on domain mapping config
 */
export const shouldIncludeUrl = (
  href: string,
  config: DomainMappingConfig,
  baseUrl: string
): boolean => {
  // Include internal links (same domain as baseUrl)
  if (href.startsWith('/') || href.includes(baseUrl)) {
    return true
  }

  // Include specifically configured domains
  if (config.includedDomains?.some((domain) => href.includes(domain))) {
    return true
  }

  // Include domains from mappings (both manual and auto-detected)
  const autoMappings =
    config.autoDetectFromBaseUrl !== false
      ? autoDetectDomainMapping(baseUrl)
      : {}
  const allMappings = { ...autoMappings, ...config.mappings }

  return Object.keys(allMappings).some((prodDomain) =>
    href.includes(prodDomain)
  )
}
