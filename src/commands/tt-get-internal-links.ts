import { isInternal } from './../utils/isInternal'
import { addCredentialsToInternalLinks } from './../utils/extractAuth'

const isNonRequestableLink = (href: string): boolean => {
  const nonRequestablePatterns = [
    '#',
    'javascript:',
    'mailto:',
    'tel:',
    'data:'
  ]
  
  return nonRequestablePatterns.some(pattern => 
    href === pattern || href.startsWith(pattern)
  )
}

const isNeverCodeAloneDomain = (url: string): boolean => {
  return url.includes('projects.nevercodealone.de')
}

const normalizeUrl = (href: string, baseUrl: string, currentUrl: string): string => {
  // Special case for projects.nevercodealone.de - accept both HTTP and HTTPS
  if (isNeverCodeAloneDomain(baseUrl) && href.startsWith('http://')) {
    return href
  }
  
  if (href.startsWith('https://')) {
    return href
  }
  
  if (href.startsWith('/')) {
    return new URL(href, baseUrl).toString()
  }
  
  return new URL(href, currentUrl).toString()
}

export const ttGetInternalLinks = (
  linkSelector: string = ''
): Cypress.Chainable<string[]> => {
  cy.log('ttGetInternalLinks - NCA TESTIFY')

  const baseUrl = Cypress.config('baseUrl')
  
  return cy.url().then((currentUrl) => {
    return cy.get(`${linkSelector ? linkSelector + ' ' : ''}a[href]`).then(($links) => {
      const uniqueLinks = new Map<string, string>()

      $links.each((_, element) => {
        const href = element.getAttribute('href')

        if (!href || !href.trim()) {
          return
        }

        if (isNonRequestableLink(href)) {
          return
        }

        try {
          const normalizedUrl = normalizeUrl(href, baseUrl, currentUrl)
          const urlWithoutFragment = normalizedUrl.split('#')[0]
          
          if (isInternal(urlWithoutFragment)) {
            uniqueLinks.set(urlWithoutFragment, urlWithoutFragment)
          }
        } catch {
          cy.log(`Error processing URL: ${href}`)
        }
      })

      const internalLinks = Array.from(uniqueLinks.values())
      const linksWithCredentials = addCredentialsToInternalLinks(internalLinks, baseUrl)
      return cy.wrap(linksWithCredentials)
    })
  })
}
