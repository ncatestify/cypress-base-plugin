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

  return nonRequestablePatterns.some(
    (pattern) => href === pattern || href.startsWith(pattern)
  )
}

const normalizeUrl = (
  href: string,
  baseUrl: string,
  currentUrl: string
): string => {
  if (href.startsWith('https://') || href.startsWith('http://')) {
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
    const selector = linkSelector ? `${linkSelector} a[href]` : 'a[href]'
    return cy
      .get(selector)
      .then(($links) => {
        const uniqueLinks = new Set<string>()

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
              uniqueLinks.add(urlWithoutFragment)
            }
          } catch {
            cy.log(`Error processing URL: ${href}`)
          }
        })

        const internalLinks = Array.from(uniqueLinks)
        const linksWithCredentials = addCredentialsToInternalLinks(
          internalLinks,
          baseUrl
        )
        return cy.wrap(linksWithCredentials)
      })
  })
}
