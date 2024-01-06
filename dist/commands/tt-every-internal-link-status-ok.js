export const ttEveryInternalLinkStatusOk = () => {
    //@ts-ignore
    return cy.ttGetInternalLinks().then((urls) => {
        cy.log('everyInternalLinkStatusOk - NCA TESTIFY');
        cy.wrap(urls).its('length').should('be.gt', 2);
        let allLinksOk = true;
        urls.forEach((url) => {
            cy.request({
                url
            }).then((resp) => {
                if (resp.headers['content-type'].includes('text/html')) {
                    allLinksOk = allLinksOk && resp.status === 200;
                }
                else {
                    cy.log('Skip content type');
                    cy.log(url);
                    cy.log(resp.headers['content-type'].toString());
                }
            });
        });
        return cy.wrap(allLinksOk);
    });
};
