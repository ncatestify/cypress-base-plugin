import { ttGetInternalLinks } from './tt-get-internal-links'
import { ttValidateAllImagesResponseStatusOk } from './tt-validate-all-images-response-status-ok'

const scrollTillLoaded = (loadTimeout: number): void => {
  cy.log('Scrolling page to trigger lazy loading - NCA TESTIFY')

  const scrollToBottom = (): void => {
    cy.window({ log: false }).then((win) => {
      const nextScroll = win.scrollY + win.innerHeight
      win.scrollTo(0, nextScroll)

      if (nextScroll < win.document.documentElement.scrollHeight) {
        cy.wait(300, { log: false }).then(scrollToBottom)
        return
      }

      cy.log('Page bottom reached, waiting for lazy loading images')
      cy.get('img[src], img[srcset]', { timeout: loadTimeout }).should(
        ($imgs) => {
          $imgs.each((_, element) => {
            const img = element as HTMLImageElement
            if (!img.complete || img.naturalWidth === 0) {
              throw new Error(
                `Image not loaded: ${
                  img.currentSrc ||
                  img.getAttribute('src') ||
                  img.getAttribute('srcset') ||
                  'unknown'
                }`
              )
            }
          })
        }
      )
    })
  }

  scrollToBottom()
}

export const ttValidateSubpagesAndImages = (
  limit: number = 20,
  linkSelector?: string,
  loadTimeout: number = 10000
) => {
  cy.log('ttValidateSubpagesAndImages - NCA TESTIFY')
  return ttGetInternalLinks(linkSelector).then((urls: string[]) => {
    urls.slice(0, limit).forEach((url) => {
      if (!url.includes('.pdf')) {
        cy.visit(url)
        scrollTillLoaded(loadTimeout)
        ttValidateAllImagesResponseStatusOk(url)
      } else {
        cy.log('PDF detected' + url)
      }
      cy.clearAllLocalStorage()
    })
    return null
  })
}
