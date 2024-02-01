import { isInternal } from './../utils/isInternal'

export const ttGetInternalLinks = (): Cypress.Chainable<string[]> => {
  cy.log('ttGetInternalLinks - NCA TESTIFY')
  const listOfResults: string[] = []

  return cy.get('a').then((anchorElements) => {
    const processLink = (index) => {
      if (index >= anchorElements.length) {
        return listOfResults // Alle Links wurden verarbeitet
      }

      const href = anchorElements[index].getAttribute('href')
      if (
        href &&
        isInternal(href) &&
        !href.includes('mailto') &&
        !href.includes('tel')
      ) {
        const baseUrl = Cypress.config('baseUrl')
        const singleResult = href.replace(baseUrl, '')
        if (!listOfResults.includes(singleResult)) {
          listOfResults.push(singleResult)
        }
      } else if (href) {
        cy.log('Filtered URL: ' + href)
      } else {
        cy.log('Empty or null URL')
      }

      return cy.then(() => processLink(index + 1))
    }

    return processLink(0)
  })
}
