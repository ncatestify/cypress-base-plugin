import { isInternal } from './../utils/isInternal'
import { extractAuth, applyAuth } from './../utils/extractAuth'
import { DomainMappingConfig, shouldIncludeUrl } from './../utils/domainMapping'

export const ttGetInternalLinks = (
  linkSelectorOrConfig: string | DomainMappingConfig = '',
  legacyConfig?: DomainMappingConfig
): Cypress.Chainable<string[]> => {
  // Handle backwards compatibility
  let linkSelector = ''
  let config: DomainMappingConfig = {}
  
  if (typeof linkSelectorOrConfig === 'string') {
    linkSelector = linkSelectorOrConfig
    config = legacyConfig || {}
  } else {
    config = linkSelectorOrConfig
  }
  cy.log('ttGetInternalLinks - NCA TESTIFY')

  return cy.get(`${linkSelector} a`).then(($links) => {
    const baseUrl = Cypress.config('baseUrl')
    const auth = extractAuth(baseUrl)
    const internalLinks: string[] = []

    $links.each((index, link) => {
      const href = link.getAttribute('href')

      if (
        href &&
        href.trim() !== '' &&
        !href.includes('mailto') &&
        !href.includes('tel') &&
        !href.includes('#') &&
        !href.startsWith('javascript:') &&
        (isInternal(href) || shouldIncludeUrl(href, config, baseUrl))
      ) {
        // Handle both internal and external URLs
        let urlToStore: string
        
        if (href.startsWith('http')) {
          // Already a full URL (could be external)
          urlToStore = href
        } else if (href.startsWith('/')) {
          // Absolute path - combine with baseUrl to create relative path
          urlToStore = href
        } else {
          // Relative path - convert to absolute path
          const fullUrl = new URL(href, baseUrl).toString()
          const cleanBase = baseUrl.replace(/\/$/, '')
          urlToStore = fullUrl.replace(cleanBase, '')
        }
        
        // Apply auth if needed for internal URLs
        if (auth && !urlToStore.startsWith('http')) {
          const fullUrl = urlToStore.startsWith('/') ? baseUrl + urlToStore : urlToStore
          const authUrl = applyAuth(fullUrl, auth)
          const cleanBase = baseUrl.replace(/\/$/, '')
          urlToStore = authUrl.replace(cleanBase, '')
        }
        
        if (
          urlToStore &&
          urlToStore.trim() !== '' &&
          !internalLinks.includes(urlToStore)
        ) {
          internalLinks.push(urlToStore)
        }
      } else if (href) {
        cy.log('Filtered URL: ' + href)
      } else {
        cy.log('Empty or null URL')
      }
    })

    return cy.wrap(internalLinks)
  })
}
