export const ttEveryInternalLinkStatusOk = () => {
    cy.ttGetInternalLinks().then((urls) => {
        cy.log("everyInternalLinkStatusOk - NCA TESTIFY");
        cy.wrap(urls).its("length").should("be.gt", 2);
        urls.forEach((url) => {
            cy.request({
                url: url,
            }).then((resp) => {
                if (resp.headers["content-type"].includes("text/html")) {
                    expect(resp.status).to.eq(200);
                }
                else {
                    cy.log("Skip content type");
                    cy.log(url);
                    cy.log(resp.headers["content-type"].toString());
                }
            });
        });
    });
};
