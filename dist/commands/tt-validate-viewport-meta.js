"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ttValidateViewportMeta = void 0;
const ttValidateViewportMeta = () => {
    cy.log('ttValidateViewportMeta - NCA TESTIFY');
    cy.get('head meta[name="viewport"]').should('exist');
    cy.get('head meta[name="viewport"]')
        .invoke('attr', 'content')
        .then((content) => {
        expect(content, 'Viewport meta should contain "width=device-width"').to.include('width=device-width');
        cy.log(`Viewport: ${content}`);
    });
};
exports.ttValidateViewportMeta = ttValidateViewportMeta;
