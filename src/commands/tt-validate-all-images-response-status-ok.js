import { isString } from 'cypress/types/lodash';
export const ttValidateAllImagesResponseStatusOk = () => {
    cy.log('ttValidateAllImagesResponseStatusOk - NCA TESTIFY');
    cy.get('img').each((img) => {
        cy.wrap(img)
            .should('have.attr', 'src')
            .then((src) => {
            if (isString(src)) {
                cy.request(src).its('status').should('eq', 200);
            }
            else {
                cy.log('img src is not a string');
            }
        });
    });
};
