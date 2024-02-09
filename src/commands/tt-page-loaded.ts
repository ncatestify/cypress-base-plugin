export const ttPageLoaded = (timeout = 5000, checkInterval = 1000) => {
  let lastRequestCount = 0
  let totalRequests = 0

  function checkForNewRequests() {
    const currentRequests = cy.state('requests') || []
    if (currentRequests.length > lastRequestCount) {
      lastRequestCount = currentRequests.length
      totalRequests = currentRequests.length
      cy.wait(checkInterval).then(checkForNewRequests)
    } else if (currentRequests.length === totalRequests) {
      cy.log('No new network requests, page considered loaded')
    }
  }

  cy.intercept('*').as('anyRequest')
  cy.wait(checkInterval).then(() => {
    const currentRequests = cy.state('requests') || []
    if (currentRequests.length > 0) {
      checkForNewRequests()
    } else {
      cy.log('No network requests, page considered loaded')
    }
  })
}
