export const isInternal = (url: string): boolean => {
  // Starts with / = internal
  if (url.startsWith('/')) {
    return true
  }
  
  // No protocol = relative = internal
  if (!url.includes('://')) {
    return true
  }
  
  // Has protocol = check if same domain as baseUrl
  const baseUrl = typeof Cypress !== 'undefined' 
    ? Cypress.config('baseUrl') 
    : process.env.BASE_URL || 'https://localhost:3000'
  
  // Special case for NCA domains - handle HTTP/HTTPS mismatch
  const ncaIP = '213.203.219.157'
  const ncaDomains = ['nevercodealone.de', 'dsv98.de', 'projects.nevercodealone.de']
  
  const baseUrlDomain = baseUrl.replace(/https?:\/\//, '').split('/')[0]
  const urlDomain = url.replace(/https?:\/\//, '').split('/')[0]
  
  // If both URLs are on same domain (ignoring protocol), consider internal
  if (baseUrlDomain === urlDomain) {
    return true
  }
  
  // Check if it's an NCA domain where we allow protocol mismatch
  const isNCABaseUrl = baseUrl.includes(ncaIP) || ncaDomains.some(d => baseUrl.includes(d))
  const isNCAUrl = url.includes(ncaIP) || ncaDomains.some(d => url.includes(d))
  
  if (isNCABaseUrl && isNCAUrl && baseUrlDomain === urlDomain) {
    return true
  }
    
  return url.startsWith(baseUrl)
}
