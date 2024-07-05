'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ttValidateImprintClickable = void 0
const chai_1 = require('chai')
const ttValidateImprintClickable = () => {
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
            ;(0, chai_1.expect)(isImpressum).to.be.true
            return false // to break out of the each loop
          })
        }
      }
    })
    .then(($list) => {
      if ($list.length === 0) {
        ;(0, chai_1.expect)(false).to.be.true // Fails the test if no clickable link is found
      }
    })
}
exports.ttValidateImprintClickable = ttValidateImprintClickable
