import { ttGetInternalLinks } from './tt-get-internal-links'
import { ttValidateAllImagesResponseStatusOk } from './tt-validate-all-images-response-status-ok'

export const ttValidateSubpagesAndImages = (
  limit: number = 20,
  linkSelector?: string
) => {
  cy.log('ttValidateSubpagesAndImages - NCA TESTIFY')
  return ttGetInternalLinks(linkSelector).then((urls: string[]) => {
    urls.slice(0, limit).forEach((url) => {
      if (!url.includes('.pdf')) {
        cy.visit(url)
        ttValidateAllImagesResponseStatusOk()
      } else {
        cy.log('PDF detected' + url)
      }
      cy.clearAllLocalStorage()
    })
    return null
  })
}
