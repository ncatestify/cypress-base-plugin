export const ttGetInternalLinks = () => {
  cy.log('ttGetInternalLinks - NCA TESTIFY')
  const listOfResults: string[] = []
  cy.get('a').each((resultItem) => {
    let singleResult = ''
    //Retrive Title
    cy.wrap(resultItem)
      .invoke('attr', 'href')
      .then((href) => {
        if (
          typeof href !== 'undefined' &&
          isInternal(href) &&
          href.indexOf('mailto') == -1 &&
          href.indexOf('tel') == -1 &&
          Cypress._.indexOf(listOfResults, href) == -1
        ) {
          // @ts-ignore
          singleResult = href.replace(Cypress.config('baseUrl'), '')
        } else {
          cy.log('Filtered URL: ' + href)
        }
      })
    cy.then(() => {
      if (singleResult.length) {
        listOfResults.push(singleResult)
      }
    })
  })

  return cy.wrap(listOfResults)
}

function isInternal(url: string): boolean {
  // @ts-ignore
  return url.startsWith('/') || url.includes(Cypress.config('baseUrl'))
}
