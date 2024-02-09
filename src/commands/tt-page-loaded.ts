export const ttPageLoaded = (): void => {
  let pendingRequests = 0

  cy.intercept('*', (req) => {
    pendingRequests++
    req.on('response', () => {
      pendingRequests--
    })
  }).as('anyRequest')

  function waitForRequestsToFinish(): void {
    if (pendingRequests > 0) {
      cy.wait(1000).then(waitForRequestsToFinish)
    } else {
      cy.log('No new network requests, page considered loaded')
    }
  }

  waitForRequestsToFinish()
}
