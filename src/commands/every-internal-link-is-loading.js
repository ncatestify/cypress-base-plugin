export const everyInternalLinkIsLoading = () => {
    cy.getInternalLinks().then((urls) => {
        cy.log("everyInternalLinkIsLoading - NCA TESTIFY");
        cy.getInternalLinks().then((urls) => {
            urls.forEach((url) => {
                cy.request({
                    url: url,
                    followRedirect: false,
                }).then((resp) => {
                    if (resp.headers["content-type"].includes("text/html")) {
                        cy.visit(url);
                        cy.get("a", { timeout: Cypress.env("waitForStartpage") }).should("be.visible");
                    }
                    else {
                        cy.log("Skip content type");
                        cy.log(url);
                        cy.log(resp.headers["content-type"].toString());
                    }
                });
            });
        });
    });
};
