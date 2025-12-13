describe('Element Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Check if elements exist', () => {
    cy.ttElementExists('.example-element')
  })

  it('Example for click and not click optional css selector', () => {
    cy.visit('/alles')
    cy.ttClickIfElementExist('.example-element')
    cy.ttClickIfElementExist('.button')
  })

  it('Check threshold', () => {
    cy.ttThreshold()
  })
})
