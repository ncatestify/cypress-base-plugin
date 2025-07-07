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
  
  // Special case for projects.nevercodealone.de
  if (baseUrl.includes('projects.nevercodealone.de') && url.includes('projects.nevercodealone.de')) {
    // Extract domain from both URLs to compare
    const baseUrlDomain = baseUrl.replace(/https?:\/\//, '').split('/')[0]
    const urlDomain = url.replace(/https?:\/\//, '').split('/')[0]
    return baseUrlDomain === urlDomain
  }
    
  return url.startsWith(baseUrl)
}
