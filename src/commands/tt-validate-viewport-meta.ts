export const ttValidateViewportMeta = (): void => {
  cy.log('ttValidateViewportMeta - NCA TESTIFY')
  cy.get('head meta[name="viewport"]').should('exist')
  cy.get('head meta[name="viewport"]')
    .invoke('attr', 'content')
    .then((content: string) => {
      expect(
        content,
        'Viewport meta should contain "width=device-width"'
      ).to.include('width=device-width')
      cy.log(`Viewport: ${content}`)
    })
}
