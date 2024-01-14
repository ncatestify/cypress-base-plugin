export const isInternal = (url: string): boolean => {
  let baseUrlString
  if (typeof Cypress !== 'undefined') {
    // Cypress context
    baseUrlString = Cypress.config('baseUrl')
  } else {
    // Jest context
    baseUrlString = process.env.BASE_URL || 'http://localhost:3000'
  }

  const baseUrl = new URL(baseUrlString)
  const urlToCheck = new URL(url, baseUrl.href)

  return urlToCheck.origin === baseUrl.origin
}
