import { isInternal } from '../utils/isInternal'
export const ttGetInternalLinks = () => {
  cy.log('ttGetInternalLinks - NCA TESTIFY')
  const listOfResults = []
  cy.get('a').each((resultItem) => {
    let singleResult = ''
    cy.wrap(resultItem)
      .invoke('attr', 'href')
      .then((href) => {
        if (
          href != null &&
          isInternal(href) &&
          !href.includes('mailto') &&
          !href.includes('tel') &&
          !listOfResults.includes(href)
        ) {
          const baseUrl = Cypress.config('baseUrl')
          singleResult = href.replace(baseUrl, '')
        } else if (href != null) {
          cy.log('Filtered URL: ' + href)
        } else {
          cy.log('Empty or null URL')
        }
      })
    cy.then(() => {
      if (singleResult.length !== 0) {
        listOfResults.push(singleResult)
      }
    })
  })
  return cy.wrap(listOfResults, { log: false })
}
