# Cypress.IO plugin by NCA TESTIFY

Basis tests for every website testing project

## Usage:

Add following line in your cypress/support/e2e.js|.ts file

`import 'cypress-ncatestify-plugin'`

in your cypress.config.js|.ts file the key baseUrl must be set

```js
module.exports = defineConfig({
  e2e: {
    baseUrl: "https://testify.team/de",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
```

Then in your Testfile

```js
describe("Validate Testify Tests", () => {
  it("Runs Testify base tests", () => {
    cy.visit("/");
    cy.ttRunTestifyBaseTests();
  });
});
```

## Run commands

```bash
npm run typecheck
```

```bash
npm run build
```

```bash
npx cypress open
```

```bash
export CYPRESS_BASE_URL=https://nevercodealone.de && npx cypress open
```

For contributing remove local js files
```bash
rm -rf **/*.js
```

Validate types with no generating
```bash
npm run typecheck
```

Build js files
```bash
npm run build
```

## Websites being tested with this plugin
https://www.auto-hortz.de/
https://www.discounto.de/
https://nevercodealone.de/
