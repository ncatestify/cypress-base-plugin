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
