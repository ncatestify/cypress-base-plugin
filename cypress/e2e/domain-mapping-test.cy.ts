describe('Domain Mapping Feature Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
  })

  it('should work with original API (backwards compatibility)', () => {
    // Test original API still works
    cy.ttEveryInternalLinkStatusOk()
    cy.ttEveryInternalLinkIsLoading(5)
    cy.ttGetInternalLinks()
  })

  it('should work with new domain mapping configuration', () => {
    // Test new API with domain mapping
    cy.ttEveryInternalLinkStatusOk({
      mappings: {
        'example.com': 'staging.example.com'
      },
      minLinksRequired: 1,
      autoDetectFromBaseUrl: true
    })
  })

  it('should work with auto-detection', () => {
    // Test auto-detection functionality
    cy.ttEveryInternalLinkStatusOk({
      autoDetectFromBaseUrl: true,
      minLinksRequired: 1
    })
  })

  it('should work with custom included domains', () => {
    // Test including specific domains
    cy.ttEveryInternalLinkStatusOk({
      includedDomains: ['external-api.com'],
      mappings: {
        'external-api.com': 'test-api.com'
      },
      minLinksRequired: 1
    })
  })

  it('should handle loading with domain mapping', () => {
    // Test loading with domain mapping
    cy.ttEveryInternalLinkIsLoading({
      mappings: {
        'production.com': 'staging.production.com'
      },
      minLinksRequired: 1
    })
  })
})