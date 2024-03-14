describe('Validate Testify Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Alles akzeptieren', () => {
    cy.visit('/alles/')
    cy.ttCookieAllAcceptClick()
  })

  it('Alle akzeptieren', () => {
    cy.visit('/alle/')
    cy.ttCookieAllAcceptClick()
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

  it('Only one h1', () => {
    cy.ttOnlyOneH1()
  })

  it('Invalid path returns 404', () => {
    cy.ttInvalidPath404()
  })

  it('Validates language tag', () => {
    cy.ttValidateLanguageTag()
  })

  it('Detects http', () => {
    cy.ttDetectHttp()
  })

  it('Detects treshold', () => {
    cy.ttThreshold()
  })

  it('Detects console errors', () => {
    cy.ttSetupConsoleErrorListener()
  })
})
