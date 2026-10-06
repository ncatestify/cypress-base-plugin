/**
 * Extract Basic Auth credentials from a URL
 * @param url - URL string that may contain Basic Auth credentials
 * @returns Object with auth credentials or null
 */
export const extractAuth = (
  url: string
): { username: string; password: string } | null => {
  try {
    const urlObj = new URL(url)
    if (urlObj.username && urlObj.password) {
      return {
        username: urlObj.username,
        password: urlObj.password
      }
    }
    return null
  } catch {
    return null
  }
}

/**
 * Apply Basic Auth credentials to a URL
 * @param url - Target URL
 * @param auth - Auth credentials
 * @returns URL with auth credentials
 */
export const applyAuth = (
  url: string,
  auth: { username: string; password: string } | null
): string => {
  if (!auth) return url

  try {
    const urlObj = new URL(url)
    urlObj.username = auth.username
    urlObj.password = auth.password
    return urlObj.toString()
  } catch {
    return url
  }
}

/**
 * Add baseUrl credentials to internal links
 * @param links - Array of internal link URLs
 * @param baseUrl - Base URL that may contain credentials (e.g., https://user:pass@domain.com)
 * @returns Array of links with credentials applied
 */
export const addCredentialsToInternalLinks = (
  links: string[],
  baseUrl?: string
): string[] => {
  if (!baseUrl) {
    baseUrl =
      typeof Cypress !== 'undefined' ? Cypress.config('baseUrl') : undefined
  }

  if (!baseUrl) return links

  const auth = extractAuth(baseUrl)
  if (!auth) return links

  return links.map((link) => {
    if (link.includes('@')) return link
    return applyAuth(link, auth)
  })
}

/**
 * Extract the host of a URL, ignoring credentials
 * @param url - URL to extract the host from
 * @returns Host without credentials or null for invalid URLs
 */
const hostOf = (url: string): string | null => {
  try {
    return new URL(url).host
  } catch {
    return null
  }
}

/**
 * Checks if a URL is relative (no protocol)
 * @param url - URL to check
 * @returns true for relative paths like '/img/logo.png', false for absolute URLs
 */
const isRelativeUrl = (url: string): boolean => {
  return !url.includes('://') && !url.startsWith('//')
}

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
export const extractAuthForUrl = (
  url: string,
  baseUrl?: string
): { username: string; password: string } | null => {
  if (!baseUrl) {
    baseUrl =
      typeof Cypress !== 'undefined' ? Cypress.config('baseUrl') : undefined
  }

  if (!baseUrl) return null

  const auth = extractAuth(baseUrl)
  if (!auth) return null

  if (isRelativeUrl(url)) return auth

  const target = url.startsWith('//') ? `https:${url}` : url
  const urlHost = hostOf(target)
  const baseUrlHost = hostOf(baseUrl)

  if (!urlHost || !baseUrlHost) return null

  return urlHost === baseUrlHost ? auth : null
}
