import { isInternal } from './../utils/isInternal'

export const ttGetInternalLinks = (
  linkSelector: string = ''
): Cypress.Chainable<string[]> => {
  cy.log('ttGetInternalLinks - NCA TESTIFY')

  return cy.get(`${linkSelector} a`).then(($links) => {
    const baseUrl = Cypress.config('baseUrl')
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
        const singleResult = href.replace(baseUrl, '')
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
