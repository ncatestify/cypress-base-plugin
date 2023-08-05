describe('Validate Testify Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Accessibility test', () => {
    cy.ttAccessibility()
  })

  it('Imprint', () => {
    cy.ttValidateImprintClickable()
  })  

  it('Detect google services', () => {
    cy.ttValidateNoGoogleServices()
  })

  it('More than one img with status ok', () => {
    cy.ttValidateAllImagesResponseStatusOk()  
  })  
  
  it('More than 2 internal links for each are ok', () => {
    cy.ttEveryInternalLinkStatusOk()
  })  
  
  it('All subpages are loading', () => {
    cy.ttEveryInternalLinkIsLoading()  
  })  

  it('Validate page content', () => {
    cy.ttValidatePageContent()  
  })  

  it('Only one h1', () => {
    cy.ttOnlyOneH1()
  })

  it('Invalid path returns 404', () => {
    cy.ttInvalidPath404()
  })
})
