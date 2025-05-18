# Cypress.IO plugin by NCA TESTIFY

Basis tests for every website testing project. Now compatible with Cypress 14 and TypeScript 5.x!

## Usage:

Add following line in your cypress/support/e2e.js|.ts file

`import 'cypress-ncatestify-plugin'`

in your cypress.config.js|.ts file the key baseUrl must be set

### TypeScript (recommended)
```ts
import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://testify.team/de',
    setupNodeEvents(on, config) {
      return config
    }
  }
})
```

### JavaScript
```js
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://testify.team/de',
    setupNodeEvents(on, config) {
      return config
    }
  }
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

Run s specific file

```bash
export CYPRESS_BASE_URL=https://nevercodealone.de && npx cypress run --config-file cypress.config.ts --spec "cypress/e2e/validate.cy.ts"
```

### Static file CMS

cd eleventy-page && npx eleventy --serve

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

## Testing and Code Quality

### Running Tests

To run the test suite, execute the following command:

```bash
npx jest --config jest.config.ts
```

This will run all Jest tests located in the `__tests__` directory.

### Type Checking

To perform TypeScript type checking, run:

```bash
npm run typecheck
```

This ensures that the code adheres to the TypeScript configurations and catches potential type errors.

### Code Formatting

To auto-format the codebase, run:

```bash
npm run prettier
```

This will format the code according to the rules specified in the `.prettierrc` file.

### CI/CD Pipeline

All of these checks are automatically run in our GitHub Actions CI/CD pipeline on every push and pull request to the `main` branch. This ensures that all merged code is properly tested, type-checked, and formatted.

## Commands

### Cookie Management

#### Click accept all cookies
Automatically clicks cookie acceptance buttons for various cookie consent providers.

```js
cy.ttCookieAllAcceptClick()
```

### Link Validation

#### Validate all internal links return OK status (200)
Checks that all internal links return a 200 status code. Supports HTTP Basic Authentication when baseUrl contains credentials.

```js
cy.ttEveryInternalLinkStatusOk()
```

#### Validate all internal links are loading
Visits each internal link to verify they load correctly.

```js
cy.ttEveryInternalLinkIsLoading()
```

#### Get all internal links as array
Returns an array of all internal links found on the page.

```js
cy.ttGetInternalLinks()
cy.ttGetInternalLinks('.content') // Optional: specify a container selector
```

### Image Validation

#### Validate all images return status code 200
Verifies that all images (src and srcset) return a 200 status code. Supports HTTP Basic Authentication.

```js
cy.ttValidateAllImagesResponseStatusOk()
```

### SEO & Meta Validation

#### Validate imprint/legal page is clickable
Ensures legal/imprint links are present and clickable.

```js
cy.ttValidateImprintClickable()
```

#### Validate no Google services are being loaded
Checks that no Google services (analytics, fonts, etc.) are loaded on the page.

```js
cy.ttValidateNoGoogleServices()
```

#### Validate page has only one H1 headline
Ensures proper SEO structure with a single H1 tag.

```js
cy.ttOnlyOneH1()
```

#### Validate page has language tag
Verifies the HTML lang attribute matches the expected language.

```js
cy.ttValidateLanguageTag('de')  // For German
cy.ttValidateLanguageTag('en')  // For English
```

### Security & Protocol Validation

#### Detect HTTP links
Finds any non-HTTPS links on the page.

```js
cy.ttDetectHttp()
```

### Error Handling

#### Setup console error listener
Monitors for JavaScript console errors during test execution.

```js
cy.ttSetupConsoleErrorListener()
```

#### Validate invalid paths return 404
Verifies that non-existent URLs properly return a 404 status.

```js
cy.ttInvalidPath404()
```

### Accessibility

#### Check for accessibility issues
Runs automated accessibility tests using axe-core.

```js
cy.ttAccessibility()
cy.ttAccessibility('.main-content')  // Optional: test specific context
cy.ttAccessibility(null, { runOnly: ['wcag2a', 'wcag2aa'] })  // Optional: axe options
```

### Performance

#### Performance measurement with threshold
Measures total page load size against a threshold.

```js
cy.ttThreshold()     // Default threshold
cy.ttThreshold(2)    // Set threshold to 2MB
```

#### Page loaded verification
Verifies the page has fully loaded.

```js
cy.ttPageLoaded()
```

### Content Validation

#### Run all page content validation tests
Executes a suite of content validation tests.

```js
cy.ttValidatePageContent()
```

#### Validate subpages and images
Validates multiple subpages and their images.

```js
cy.ttValidateSubpagesAndImages()
cy.ttValidateSubpagesAndImages(5)  // Test only first 5 pages
cy.ttValidateSubpagesAndImages(10, '.nav')  // Test 10 pages from nav links
```

### Utility Commands

#### Click element if it exists
Conditionally clicks an element only if it exists on the page.

```js
cy.ttClickIfElementExist('.cookie-accept')
cy.ttClickIfElementExist('#modal-close')
```

#### Check if element exists
Returns a boolean indicating whether an element exists.

```js
cy.ttElementExists('.banner').then(exists => {
  if (exists) {
    // Element exists
  }
})
```

### Comprehensive Testing

#### Run all TESTIFY base tests
Executes the complete suite of TESTIFY validation tests.

```js
cy.ttRunTestifyBaseTests()
```

This runs:
- Internal link status validation
- Image response validation  
- Google services check
- Imprint clickability
- Internal link loading
- Accessibility tests
- H1 validation
- 404 error handling
- Language tag validation (defaults to 'de')
- HTTP link detection

## HTTP Basic Authentication Support

This plugin supports HTTP Basic Authentication for websites that require credentials. When your `baseUrl` contains authentication credentials, all link and image validation commands will automatically use these credentials.

### Setup

Configure your Cypress baseUrl with credentials:

```js
// cypress.config.js
export default defineConfig({
  e2e: {
    baseUrl: 'https://username:password@example.dev',
    // ... other config
  }
})
```

Or set via environment variable:

```bash
export CYPRESS_BASE_URL=https://username:password@example.dev
npx cypress run
```

### Supported Commands

The following commands automatically handle HTTP Basic Authentication:
- `ttEveryInternalLinkStatusOk()` - Validates internal link status codes
- `ttValidateAllImagesResponseStatusOk()` - Validates image response codes
- `ttInvalidPath404()` - Validates 404 error pages
- All other commands that use `cy.visit()` inherit authentication from the baseUrl

## Websites being tested with this plugin

https://www.auto-hortz.de
https://www.discounto.de
https://nevercodealone.de

## Compatibility

This plugin is compatible with:
- Cypress 14.x
- TypeScript 5.x
- Node.js 18+
