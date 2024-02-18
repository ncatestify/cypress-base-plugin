export const ttThreshold = (thresholdMB: number = 1): void => {
  cy.window().then((win) => {
    const thresholdBytes = thresholdMB * 1024 * 1024
    const pageWeight = win.performance
      .getEntriesByType('resource')
      .reduce((total, resource) => {
        if (resource instanceof PerformanceResourceTiming) {
          return total + (resource.encodedBodySize || 0)
        }
        return total
      }, 0)
    const pageWeightMB = pageWeight / (1024 * 1024)
    if (pageWeight > thresholdBytes) {
      cy.log(
        `Page weight exceeds threshold: ${pageWeightMB.toFixed(
          2
        )} MB (${pageWeight} bytes)`
      )
      assert.fail(
        `Page weight exceeds threshold: ${pageWeightMB.toFixed(
          2
        )} MB (${pageWeight} bytes)`
      )
    } else {
      cy.log(`Page weight: ${pageWeightMB.toFixed(2)} MB (${pageWeight} bytes)`)
    }
  })
}
