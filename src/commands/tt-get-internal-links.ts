import { isInternal } from './../utils/isInternal'
import { extractAuth, applyAuth } from './../utils/extractAuth'

export const ttGetInternalLinks = (
  linkSelector: string = ''
): Cypress.Chainable<string[]> => {
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
        isInternal(href) &&
        !href.includes('mailto') &&
        !href.includes('tel') &&
        !href.includes('#')
      ) {
        // Construct the full URL properly
        let fullUrl: string
        if (href.startsWith('http')) {
          // Already a full URL
          fullUrl = href
        } else if (href.startsWith('/')) {
          // Absolute path - combine with baseUrl
          const urlObj = new URL(baseUrl)
          fullUrl = `${urlObj.protocol}//${urlObj.host}${href}`
        } else {
          // Relative path - use URL constructor
          fullUrl = new URL(href, baseUrl).toString()
        }
        
        // Apply auth if needed
        if (auth) {
          fullUrl = applyAuth(fullUrl, auth)
        }
        
        // Remove the baseUrl to get relative path
        const cleanBase = baseUrl.replace(/\/$/, '') // Remove trailing slash
        const singleResult = fullUrl.replace(cleanBase, '')
        
        if (
          singleResult &&
          singleResult.trim() !== '' &&
          !internalLinks.includes(singleResult)
        ) {
          internalLinks.push(singleResult)
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
