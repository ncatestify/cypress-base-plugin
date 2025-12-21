# Cypress.IO Plugin by NCA TESTIFY

Ready-to-use tests for any website. No testing experience required.

## What is this?

This plugin gives you **pre-built tests** that check if your website works correctly:
- Are all links working?
- Do all images load?
- Is the site accessible?
- Is the SEO structure correct?

You don't need to write complex test code - just call our simple commands.

## Quick Start (5 minutes)

### 1. Install the plugin

```bash
npm install cypress-ncatestify-plugin --save-dev
```

### 2. Import in your Cypress support file

Add this line to `cypress/support/e2e.ts` (or `.js`):

```ts
import 'cypress-ncatestify-plugin'
```

### 3. Set your website URL

In `cypress.config.ts`:

```ts
import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://your-website.com'
  }
})
```

### 4. Create your first test

Create `cypress/e2e/my-first-test.cy.ts`:

```ts
describe('My Website Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('all links work', () => {
    cy.ttEveryInternalLinkStatusOk()
  })

  it('all images load', () => {
    cy.ttValidateAllImagesResponseStatusOk()
  })

  it('site is accessible', () => {
    cy.ttAccessibility()
  })
})
```

### 5. Run your tests

```bash
npx cypress open
```

That's it! You now have professional website tests.

---

## Page Object Model with BasePage

For larger projects, organize your tests using the **Page Object Model**. This makes tests more readable and maintainable.

### Why use BasePage?

Instead of seeing cryptic CSS selectors in your test logs:
```
cy.get('#ext-comp-1234')  // What is this?
```

You see meaningful names:
```
usernameInput  // Much clearer!
```

### How to use BasePage

**1. Create a Page class:**

```ts
// cypress/pages/LoginPage.ts
import { BasePage } from 'cypress-ncatestify-plugin'

export class LoginPage extends BasePage {
  // Define your page elements as getters
  get usernameInput() {
    return this.el('#username')  // Logs: usernameInput
  }

  get passwordInput() {
    return this.el('#password')  // Logs: passwordInput
  }

  get submitButton() {
    return this.elContains('Login')  // Logs: submitButton
  }

  // Create reusable actions
  login(user: string, pass: string) {
    this.usernameInput.type(user)
    this.passwordInput.type(pass)
    this.submitButton.click()
  }
}
```

**2. Use in your tests:**

```ts
// cypress/e2e/login.cy.ts
import { LoginPage } from '../pages/LoginPage'

const loginPage = new LoginPage()

describe('Login', () => {
  it('logs in successfully', () => {
    cy.visit('/login')
    loginPage.login('admin', 'secret')
    cy.url().should('include', '/dashboard')
  })
})
```

### BasePage Methods

| Method | Description | Example |
|--------|-------------|---------|
| `this.el(selector)` | Find element by CSS selector | `this.el('#email')` |
| `this.el(selector, name)` | Find element with custom log name | `this.el('#x1', 'email')` |
| `this.elContains(text)` | Find element containing text | `this.elContains('Submit')` |
| `this.elContains(text, name)` | Find by text with custom log name | `this.elContains('OK', 'confirm')` |

---

## All Commands Reference

### Link Validation

```ts
// Check all internal links return 200 status
cy.ttEveryInternalLinkStatusOk()

// Visit each internal link to verify it loads
cy.ttEveryInternalLinkIsLoading()      // Default: 10 links
cy.ttEveryInternalLinkIsLoading(20)    // Check 20 links

// Get all internal links as array
cy.ttGetInternalLinks()
cy.ttGetInternalLinks('.content')      // From specific container
```

### Image Validation

```ts
// Check all images load successfully
cy.ttValidateAllImagesResponseStatusOk()
```

### Accessibility

```ts
// Run accessibility tests (uses axe-core)
cy.ttAccessibility()
cy.ttAccessibility('.main-content')    // Test specific area
```

### SEO Checks

```ts
// Verify only one H1 tag exists
cy.ttOnlyOneH1()

// Check language tag
cy.ttValidateLanguageTag('de')         // German
cy.ttValidateLanguageTag('en')         // English

// Check imprint/legal link exists
cy.ttValidateImprintClickable()
```

### Security

```ts
// Find any non-HTTPS links
cy.ttDetectHttp()

// Check no Google services loaded
cy.ttValidateNoGoogleServices()
```

### Error Handling

```ts
// Verify 404 pages work correctly
cy.ttInvalidPath404()

// Monitor console errors
cy.ttSetupConsoleErrorListener()
```

### Cookie Management

```ts
// Accept cookies (supports various providers)
cy.ttCookieAllAcceptClick()
```

### Performance

```ts
// Check page size threshold (MB)
cy.ttThreshold()       // Default threshold
cy.ttThreshold(2)      // 2MB limit

// Verify page loaded completely
cy.ttPageLoaded()
```

### Utility Commands

```ts
// Click element only if it exists
cy.ttClickIfElementExist('.cookie-banner')

// Check if element exists (returns boolean)
cy.ttElementExists('.modal').then(exists => {
  if (exists) {
    // do something
  }
})
```

### Run All Tests

```ts
// Execute complete test suite
cy.ttRunTestifyBaseTests()
```

---

## HTTP Basic Authentication

For password-protected staging sites:

```ts
// cypress.config.ts
export default defineConfig({
  e2e: {
    baseUrl: 'https://user:password@staging.example.com'
  }
})
```

Or via environment variable:

```bash
export CYPRESS_BASE_URL=https://user:password@staging.example.com
npx cypress run
```

---

## Common Issues

### "baseUrl must be set"

Add `baseUrl` to your `cypress.config.ts`:

```ts
export default defineConfig({
  e2e: {
    baseUrl: 'https://your-site.com'
  }
})
```

### Tests timing out

Increase the timeout in your config:

```ts
export default defineConfig({
  e2e: {
    baseUrl: 'https://your-site.com',
    defaultCommandTimeout: 10000  // 10 seconds
  }
})
```

### Links failing that should pass

Some links like `mailto:`, `tel:`, `javascript:` are automatically skipped. External links are also filtered out.

---

## Development

### Run tests

```bash
npm test              # Unit tests
npm run cy:run        # Cypress tests
npm run typecheck     # Type checking
npm run lint          # ESLint
```

### Build

```bash
npm run build
```

### Local test server

```bash
cd eleventy-page && npx @11ty/eleventy --serve
# Open http://localhost:8080
```

---

## Compatibility

- Cypress 14.x / 15.x
- TypeScript 5.x
- Node.js 18+

## Sites using this plugin

- https://www.auto-hortz.de
- https://www.discounto.de
- https://nevercodealone.de

---

Made with care by [NCA TESTIFY](https://testify.team)
