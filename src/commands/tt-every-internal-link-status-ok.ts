import { extractAuth } from './../utils/extractAuth'
import { DomainMappingConfig, applyDomainMapping } from './../utils/domainMapping'

export const ttEveryInternalLinkStatusOk = (
  config: DomainMappingConfig = {}
): Cypress.Chainable<any> => {
  const { minLinksRequired = 1 } = config
  
  //@ts-ignore - Custom command type not available in build context
  return cy.ttGetInternalLinks().then((urls: string[]) => {
    cy.log('everyInternalLinkStatusOk - NCA TESTIFY')
    cy.wrap(urls).its('length').should('be.gte', minLinksRequired)
    
    const baseUrl = Cypress.config('baseUrl')
    const auth = extractAuth(baseUrl)
    
    let allLinksOk = true
    urls.forEach((url) => {
      // Apply domain mapping for staging environments
      const mappedUrl = applyDomainMapping(url, config, baseUrl)
      const fullUrl = mappedUrl.startsWith('http') ? mappedUrl : baseUrl + mappedUrl
      
      const requestOptions: any = { 
        url: fullUrl,
        failOnStatusCode: false 
      }
      
      if (auth) {
        requestOptions.auth = {
          username: auth.username,
          password: auth.password
        }
      }
      
      cy.request(requestOptions).then((resp) => {
        const wasMapped = mappedUrl !== url
        const logPrefix = wasMapped ? `🔄 Mapped ${url} → ${mappedUrl}:` : `Testing ${fullUrl}:`
        
        if (resp.headers['content-type']?.includes('text/html')) {
          const success = resp.status === 200
          allLinksOk = allLinksOk && success
          cy.log(`${success ? '✅' : '❌'} ${logPrefix} ${resp.status}`)
          
          if (!success) {
            cy.log(`⚠️ Link validation failed: ${fullUrl} returned ${resp.status}`)
          }
        } else {
          cy.log(`⏭️ ${logPrefix} Skipped (content-type: ${resp.headers['content-type']})`)
        }
      })
    })
    return cy.wrap(allLinksOk)
  })
}
