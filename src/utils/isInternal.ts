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

  // Compare hostnames (ignoring auth credentials)
  const baseHost = baseUrl.hostname + (baseUrl.port ? `:${baseUrl.port}` : '')
  const urlHost = urlToCheck.hostname + (urlToCheck.port ? `:${urlToCheck.port}` : '')

  return baseHost === urlHost
}
