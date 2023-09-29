# Cypress.IO plugin by NCA TESTIFY

Basis tests for every website testing project.

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
})
```

Then in your Testfile

```js
describe('Validate Testify Tests', () => {
  it('Runs Testify base tests', () => {
    cy.visit('/')
    cy.ttRunTestifyBaseTests()
  })
})
```

## Run commands

```bash
npm run typecheck
```

```bash
npm run build
```

```bash
npx cypress open --config-file config.cypress.ts/js
```

```bash
export CYPRESS_BASE_URL=https://nevercodealone.de && npx cypress open --config-file config.cypress.ts/js
```

### Static file CMS

cd mysite && npx eleventy --serve

### Build

npx eleventy

### Browser

http://localhost:8080

For contributing remove local `.js` files

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

## Docker command for local host on port 8090

docker run -p 8090:80 -v $(pwd)/src:/app --entrypoint python3 python:3.9-alpine -m http.server --directory /app 80

## Commands

#### Click accept all cookies

```js
cy.ttCookieAllAcceptClick()
```

```js
cy.ttCookieAllAcceptClick()
```

```js
cy.ttEveryInternalLinkStatusOk()
```

#### Validate all images return status code 200

```js
cy.ttValidateAllImagesResponseStatusOk()
```

#### Validate all internal links are loading

```js
cy.ttEveryInternalLinkIsLoading()
```

#### Return all internal links as array

```js
cy.ttGetInternalLinks()
```

#### Validate imprint is clickable

```js
cy.ttValidateImprintClickable()
```

#### Validate no google services are being loaded

```js
cy.ttValidateNoGoogleServices()
```

#### Run all TESTIFY base tests

```js
cy.ttRunTestifyBaseTests()
```

#### Check for accesibility issues

```js
cy.ttAccessibility()
```

#### Run all TESTIFY page content validation tests

```js
cy.ttValidatePageContent()
```

#### Validate page has only one headline

```js
cy.ttOnlyOneH1()
```

#### Validate invalid path returns 404 error

```js
cy.ttInvalidPath404()
```

#### Validate page has language tag

```js
cy.ttValidateLanguageTag(language: string)
```

#### Detect http links

```js
cy.ttDetectHttp()
```

Open
http://localhost:8090

## Websites being tested with this plugin

https://www.auto-hortz.de
https://www.discounto.de
https://nevercodealone.de
