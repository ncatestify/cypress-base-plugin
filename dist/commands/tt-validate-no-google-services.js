'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ttValidateNoGoogleServices = void 0
const ttValidateNoGoogleServices = () => {
  cy.on('request', (req) => {
    var _a
    if (
      !req.url.startsWith(
        `${
          (_a = Cypress.config('baseUrl')) !== null && _a !== void 0 ? _a : ''
        }`
      )
    ) {
      cy.log('External url: ' + String(req.url))
      expect(req.url).not.to.contain('/fonts.gstatic.com/')
      expect(req.url).not.to.contain('/fonts.googleapis.com/')
      expect(req.url).not.to.contain('/maps.google')
      expect(req.url).not.to.contain('/google.com/maps')
    }
  })
  cy.reload()
}
exports.ttValidateNoGoogleServices = ttValidateNoGoogleServices
