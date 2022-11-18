export const everyInternalLinkStatusOk = () => {
  cy.getInternalLinks().then((urls: Array<string>) => {
    cy.log("everyInternalLinkStatusOk - NCA TESTIFY");
    cy.wrap(urls).its("length").should("be.gt", 2);
    urls.forEach((url) => {
      cy.request({
        url: url,
      }).then((resp) => {
        expect(resp.status).to.eq(200);
      });
    });
  });
};
