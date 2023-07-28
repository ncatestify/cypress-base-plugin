export const ttValidateAllImagesResponseStatusOk = () => {
  cy.log('ttValidateAllImagesResponseStatusOk - NCA TESTIFY')
  const srcArray: string[] = []
  const srcSetArray: string[] = []

  cy.get('img').should('have.length.gt', 0)
  cy.get('img').each((img, i) => {
    if (img.attr('src') !== undefined) {
      cy.wrap(img).invoke('attr', 'src').then((src) => {
        if (typeof src === 'string') {
          cy.request(src).its('status').should('eq', 200)
          cy.log('Validated image: ' + src)
          srcArray.push(src)
        } else {
          cy.log('img src is not a string')
        }
      })
    }

    if (img.attr('srcset') !== undefined) {
      cy.wrap(img).invoke('attr', 'srcset').then((srcset) => {
        if (typeof srcset === 'string') {
          srcSetArray.push(srcset)
        } else {
          cy.log('img srcset is not a string')
        }
      })
    }

    if (img.attr('srcset') === undefined && img.attr('src') === undefined) {
      cy.wrap(img).invoke('attr', 'alt').then((imgAlt) => {
        cy.log(`Image ${imgAlt} has neither src nor srcset attribute`).then(() => {
          expect(img).to.have.attr('src')
        })
      })
    }
  }).then(() => {
    srcArray.forEach((entry) => {
      cy.get(`[src="${entry}"]`).should('exist')
    })
    srcSetArray.forEach((entry) => {
      cy.get(`[srcset="${entry}"]`).should('exist')
    })
  })
}
