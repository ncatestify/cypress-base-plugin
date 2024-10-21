const excludedUrlPrefixes = ['data:']

const isExcludedUrl = (url: string): boolean => {
  return excludedUrlPrefixes.some((prefix) => url.startsWith(prefix))
}

const normalizeUrl = (url: string): string => {
  return url.startsWith('//') ? `https:${url}` : url
}

export const ttValidateAllImagesResponseStatusOk = (): void => {
  const imageUrls = new Set<string>()

  cy.log('More then 0 images found')
  cy.get('img').should('be.visible')
  cy.get('img').should('have.length.gt', 0)
  cy.get('img')
    .each(($img) => {
      const img = $img[0] as HTMLImageElement
      const src = img.getAttribute('src')
      const srcset = img.getAttribute('srcset')

      if (src !== null) {
        const normalizedSrc = normalizeUrl(src)
        if (!isExcludedUrl(normalizedSrc)) {
          imageUrls.add(normalizedSrc)
        }
      }

      if (srcset !== null) {
        const srcsetUrls = srcset
          .split(',')
          .map((srcsetItem) => srcsetItem.trim().split(' ')[0])
          .map(normalizeUrl)
        srcsetUrls.forEach((url) => {
          if (!isExcludedUrl(url) && !imageUrls.has(url)) {
            imageUrls.add(url)
          }
        })
      }

      if (src === null && srcset === null) {
        const alt = img.getAttribute('alt') ?? ''
        cy.log(`Image ${alt} has neither src nor srcset attribute`)
        throw new Error(`Image ${alt} has neither src nor srcset attribute`)
      }
    })
    .then(() => {
      const promises: Cypress.Chainable[] = []

      imageUrls.forEach((url) => {
        const promise = cy
          .request('HEAD', url)
          .its('status')
          .should('eq', 200)
          .then(() => {
            cy.log(`Validated image: ${url}`)
          })
        promises.push(promise)
      })

      return Cypress.Promise.all(promises)
    })
}
