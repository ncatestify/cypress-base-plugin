import { isInternal } from './../utils/isInternal'
import { addCredentialsToInternalLinks } from './../utils/extractAuth'

export const ttGetInternalLinks = (
  linkSelector: string = ''
): Cypress.Chainable<string[]> => {
  cy.log('ttGetInternalLinks - NCA TESTIFY')

  return cy.get(`${linkSelector} a`).then(($links) => {
    const internalLinks: string[] = []

    $links.each((index, link) => {
      const href = link.getAttribute('href')

      if (
        href &&
        href.trim() !== '' &&
        !href.includes('mailto:') &&
        !href.includes('tel:') &&
        !href.includes('#') &&
        !href.startsWith('javascript:') &&
        isInternal(href)
      ) {
        if (!internalLinks.includes(href)) {
          internalLinks.push(href)
        }
      }
    })

    const linksWithCredentials = addCredentialsToInternalLinks(internalLinks)
    return cy.wrap(linksWithCredentials)
  })
}
