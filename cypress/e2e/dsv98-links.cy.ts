describe('DSV98 Internal Links Test', () => {
  it('should handle HTTP/HTTPS links correctly for DSV98', () => {
    cy.visit('https://www.dsv98.de')
    
    // Test getting internal links
    cy.ttGetInternalLinks().then((links) => {
      cy.log(`Found ${links.length} internal links`)
      links.forEach(link => cy.log(`Link: ${link}`))
    })
    
    // Test that all internal links return OK status
    cy.ttEveryInternalLinkStatusOk()
  })
})