export const ttValidateAllImagesResponseStatusOk = () => {
    cy.log('ttValidateAllImagesResponseStatusOk - NCA TESTIFY');
    const srcArray = [];
    const srcSetArray = [];
    cy.get('img').should('have.length.gt', 0);
    cy.get('img').each((img, i) => {
        if (img.attr('src') !== undefined) {
            cy.wrap(img).invoke('attr', 'src').then((src) => {
                if (typeof src === 'string') {
                    srcArray.push(src);
                }
                else {
                    cy.log('img src is not a string');
                }
            });
        }
        if (img.attr('srcset') !== undefined) {
            cy.wrap(img).invoke('attr', 'srcset').then((srcset) => {
                if (typeof srcset === 'string') {
                    const srcsetUrls = srcset.split(',').map((srcsetItem) => srcsetItem.trim().split(' ')[0]);
                    srcSetArray.push(...srcsetUrls);
                }
                else {
                    cy.log('img srcset is not a string');
                }
            });
        }
        if (img.attr('srcset') === undefined && img.attr('src') === undefined) {
            cy.wrap(img).invoke('attr', 'alt').then((imgAlt) => {
                cy.log(`Image ${imgAlt} has neither src nor srcset attribute`).then(() => {
                    expect(img).to.have.attr('src');
                });
            });
        }
    }).then(() => {
        const promises = [];
        srcArray.forEach((url) => {
            promises.push(cy.request('HEAD', url).its('status').should('eq', 200).then(() => {
                cy.log('Validated image: ' + url);
            }));
        });
        srcSetArray.forEach((url) => {
            promises.push(cy.request('HEAD', url).its('status').should('eq', 200).then(() => {
                cy.log('Validated image in srcset: ' + url);
            }));
        });
        return Cypress.Promise.all(promises);
    }).then(() => {
        srcArray.forEach((entry) => {
            cy.get(`[src="${entry}"]`).should('exist');
        });
        srcSetArray.forEach((entry) => {
            cy.get(`[srcset*="${entry}"]`).should('exist');
        });
    });
};
