'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.addCredentialsToInternalLinks =
  exports.applyAuth =
  exports.extractAuth =
    void 0
/**
 * Extract Basic Auth credentials from a URL
 * @param url - URL string that may contain Basic Auth credentials
 * @returns Object with auth credentials or null
 */
const extractAuth = (url) => {
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
exports.extractAuth = extractAuth
/**
 * Apply Basic Auth credentials to a URL
 * @param url - Target URL
 * @param auth - Auth credentials
 * @returns URL with auth credentials
 */
const applyAuth = (url, auth) => {
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
exports.applyAuth = applyAuth
/**
 * Add baseUrl credentials to internal links using simple @ split approach
 * @param links - Array of internal link URLs
 * @param baseUrl - Base URL that may contain credentials (e.g., https://user:pass@domain.com)
 * @returns Array of links with credentials applied
 */
const addCredentialsToInternalLinks = (links, baseUrl) => {
  if (!baseUrl) {
    baseUrl =
      typeof Cypress !== 'undefined' ? Cypress.config('baseUrl') : undefined
  }
  // Return original links if no baseUrl or no credentials
  if (!baseUrl || !baseUrl.includes('@')) return links
  // Extract credential part (everything before @)
  const credentialPart = baseUrl.split('@')[0] // e.g., "https://nca:nca"
  return links.map((link) => {
    // Skip if link already has credentials
    if (link.includes('@')) return link
    // For absolute URLs, replace protocol with credential part
    if (link.includes('://')) {
      const protocolEnd = link.indexOf('://') + 3
      return credentialPart + '@' + link.substring(protocolEnd)
    }
    // For relative URLs, convert to absolute with credentials
    if (link.startsWith('/')) {
      const domainPart = baseUrl.split('@')[1] // e.g., "testify.projects.nevercodealone.de"
      return credentialPart + '@' + domainPart + link
    }
    return link
  })
}
exports.addCredentialsToInternalLinks = addCredentialsToInternalLinks
