export const ttValidateTitleTag = (): void => {
  cy.log('ttValidateTitleTag - NCA TESTIFY')
  cy.get('head title')
    .should('exist')
    .invoke('text')
    .then((text: string) => {
      const trimmed = text.trim()
      expect(
        trimmed.length,
        `Title tag should not be empty, got: "${trimmed}"`
      ).to.be.greaterThan(0)
      cy.log(`Title: "${trimmed}"`)
    })
}
