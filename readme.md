# Cypress.IO plugin by NCA TESTIFY

Basis tests for every website testing project

## Usage:
Add following line in your cypress/support/e2e.js|.ts file

`import 'cypress-ncatestify-plugin'`

in your cypress.config.js|.ts file the key baseUrl must be set

```js
module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://testify.team/de',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
```
Then in your Testfile

```js
describe('empty spec', () => {
  it('passes', () => {
    cy.visit('/')
    cy.everyInternalLinkStatusOk()
  })
})
```

## Doc blog post links

https://glebbahmutov.com/blog/publishing-cypress-command/

https://dev.to/muratkeremozcan/how-to-create-an-internal-test-plugins-for-your-team-in-ts-implement-custom-commands-and-use-other-cypress-plugins-in-them-5lp
