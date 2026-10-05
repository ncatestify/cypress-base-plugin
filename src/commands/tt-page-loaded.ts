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
      // eslint-disable-next-line cypress/no-unnecessary-waiting -- polls until all intercepted requests have finished
      cy.wait(1000).then(waitForRequestsToFinish)
    } else {
      cy.log('No new network requests, page considered loaded')
    }
  }

  waitForRequestsToFinish()
}
