export const ttElementExists = (selector) => {
    return cy.window().then(($window) => $window.document.querySelector(selector));
};
