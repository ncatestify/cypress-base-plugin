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

  // Protokolle von den Ursprüngen entfernen
  const baseOriginNoProtocol = baseUrl.origin.replace(/^https?:\/\//, '')
  const urlOriginNoProtocol = urlToCheck.origin.replace(/^https?:\/\//, '')

  return urlOriginNoProtocol === baseOriginNoProtocol
}
