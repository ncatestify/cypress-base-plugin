export const isInternal = (url: string): boolean => {
  // Extract the domain from the baseUrl
  const baseUrlDomain = new URL(Cypress.config('baseUrl') as string).hostname

  // Regular expression to match URLs starting with "//"
  const regex = /^\/\/([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+)/

  // Check if the URL starts with "//" followed by a domain
  const match = url.match(regex)

  if (match != null) {
    // Extract the domain from the match
    const urlDomain = match[1]

    // If the domain matches the baseUrl's domain, it's internal
    if (urlDomain === baseUrlDomain) {
      return true
    }

    // Otherwise, it's external
    return false
  }

  // Your existing checks for other types of URLs
  return url.startsWith('/') || url.includes(baseUrlDomain)
}
