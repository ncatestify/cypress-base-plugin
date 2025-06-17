describe('ttEveryInternalLinkIsLoading - Anchor Links Test', () => {
  beforeEach(() => {
    cy.visit('/anchor-links-test.html')
  })

  it('should handle anchor and special links correctly', () => {
    // This test verifies that the command properly skips non-requestable links
    // and only validates actual internal links
    cy.ttEveryInternalLinkIsLoading(20)
  })

  it('should log skipped non-requestable links', () => {
    // Capture console logs to verify proper handling
    const logs: string[] = []
    
    cy.on('log:added', (log) => {
      if (log.message) {
        logs.push(log.message)
      }
    })
    
    cy.ttEveryInternalLinkIsLoading(20).then(() => {
      // Verify that non-requestable links were skipped
      const logMessages = logs.join(' ')
      expect(logMessages).to.include('Skipping non-requestable link: #')
      expect(logMessages).to.include('Skipping non-requestable link: #section1')
      expect(logMessages).to.include('Skipping non-requestable link: javascript:')
      expect(logMessages).to.include('Skipping non-requestable link: mailto:')
      expect(logMessages).to.include('Skipping non-requestable link: tel:')
      expect(logMessages).to.include('Skipping non-requestable link: data:')
      expect(logMessages).to.include('Skipping external link:')
    })
  })

  it('should validate only internal requestable links', () => {
    // Spy on cy.visit to track visited URLs
    const visitedUrls: string[] = []
    
    cy.wrap(null).then(() => {
      // Intercept visit calls
      const originalVisit = cy.visit.bind(cy)
      Cypress.Commands.overwrite('visit', (originalFn, ...args) => {
        const [url] = args
        if (typeof url === 'string') {
          visitedUrls.push(url)
        }
        return originalFn(...args)
      })
      
      return cy.ttEveryInternalLinkIsLoading(20)
    }).then(() => {
      // Check that internal links were visited
      const visitedPaths = visitedUrls.map(url => {
        try {
          return new URL(url).pathname
        } catch {
          return url
        }
      })
      
      // Should have visited internal pages
      expect(visitedPaths.some(path => path.includes('blog'))).to.be.true
      
      // Should NOT have visited non-requestable links
      expect(visitedUrls).to.not.include('#')
      expect(visitedUrls).to.not.include('#section1')
      expect(visitedUrls).to.not.include('javascript:void(0)')
      expect(visitedUrls).to.not.include('mailto:test@example.com')
    })
  })
})