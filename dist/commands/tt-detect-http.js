export const ttDetectHttp = () => {
    cy.log('ttDetectHttp - NCA TESTIFY');
    cy.get('a').each((resultItem) => {
        cy.wrap(resultItem)
            .invoke('attr', 'href')
            .then((href) => {
            if (typeof href !== 'undefined' &&
                !href.includes('mailto') &&
                !href.includes('tel')) {
                assert.notInclude(href, 'http:');
            }
            else {
                cy.log(`Filtered URL: ${href}`);
            }
        });
    });
};
