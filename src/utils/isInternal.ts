// src/utils/isInternal.ts
export const isInternal = (url: string): boolean => {
  // Verwenden einer Umgebungsvariablen oder eines Standardwerts
  const baseUrlDomain = new URL(process.env.BASE_URL || 'http://localhost:3000')
    .hostname

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
