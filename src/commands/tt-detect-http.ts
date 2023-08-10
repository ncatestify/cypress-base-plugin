export const ttDetectHttp = () => {
    cy.log('ttDetectHttp - NCA TESTIFY')
    cy.get('a').each((resultItem) => {
        cy.wrap(resultItem).invoke('attr', 'href').then((href) => {
            if (
                typeof href !== 'undefined' &&
                href.indexOf('mailto') == -1 &&
                href.indexOf('tel') == -1
            ) {
                expect(href).to.not.include('http:')
              } else {
                cy.log('Filtered URL: ' + href)
            }
        })
    })
}
