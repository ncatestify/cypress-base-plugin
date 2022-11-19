export const getInternalLinks = () => {
    const listOfResults = [];
    cy.get("a").each((resultItem) => {
        let singleResult = "";
        //Retrive Title
        cy.wrap(resultItem)
            .invoke("attr", "href")
            .then((href) => {
            if (typeof href !== "undefined" &&
                isInternal(href) &&
                href.indexOf("mailto") == -1 &&
                href.indexOf("tel") == -1 &&
                Cypress._.indexOf(listOfResults, href) == -1) {
                singleResult = href;
            }
            else {
                cy.log("Filtered URL: " + href);
            }
        });
        cy.then(() => {
            if (singleResult.length) {
                listOfResults.push(singleResult);
            }
        });
    });
    return cy.wrap(listOfResults);
};
function isInternal(url) {
    return url.startsWith("/") || url.includes(Cypress.env("baseUrl"));
}
