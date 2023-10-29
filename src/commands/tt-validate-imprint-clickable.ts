import { expect } from 'chai'

export const ttValidateImprintClickable = (): void => {
  cy.get('a')
    .each(($el, index, $list) => {
      if ($el.text().toLowerCase().includes('impressum')) {
        const element = $el.get(0)
        const rect = element.getBoundingClientRect()
        const elAtPoint = document.elementFromPoint(
          rect.left + rect.width / 2,
          rect.top + rect.height / 2
        )
        const clickable = elAtPoint === element || element.contains(elAtPoint)
        if (clickable) {
          cy.wrap($el).click()
          cy.window().then((win) => {
            const isImpressum = win.location.href.includes('/impressum')
            expect(isImpressum).to.be.true
            return false // to break out of the each loop
          })
        }
      }
    })
    .then(($list) => {
      if ($list.length === 0) {
        expect(false).to.be.true // Fails the test if no clickable link is found
      }
    })
}
