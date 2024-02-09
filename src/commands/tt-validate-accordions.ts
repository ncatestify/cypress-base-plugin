export const ttValidateAccordions = (accordionSelector: string, pTagSelector: string) => {
    cy.log('ttValidateAccordions - NCA TESTIFY')
    cy.get(accordionSelector).should('be.visible').each((accordion) => {
        cy.wrap(accordion).click().find(pTagSelector).should('be.visible');
    });
}