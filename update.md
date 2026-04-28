# Changelog

## 2.2.2

- Update Cypress to 15.14.1
- Add allowCypressEnv: false to suppress Cypress.env() deprecation warning

## 2.2.1

- Add ttValidateTitleTag command
- Add ttValidateViewportMeta command
- Add ttValidateCanonicalUrl command
- Add ttValidateFormLabels command
- Add ttCheckConsoleWarnings command
- Add ttValidateMetaDescription command
- Add ttValidateFavicon command
- Add type declarations for all new commands
- Add unit tests for new commands
- Add e2e tests for SEO and technical validation
- Update Eleventy test fixtures with meta tags and favicon
- Fix console.warn patch lost after reload in ttCheckConsoleWarnings

## 2.2.0

- Update Cypress to 15.11.0
- Update Vitest 3 to 4.0.18 and @vitest/ui to 4.0.18
- Update all devDependencies to latest versions
- Update Node.js engines to ^22.0.0 || >=24.0.0
- Update chai peer dependency to ^4.3.10 || ^5.0.0 || ^6.0.0
- Remove @11ty/eleventy from peer dependencies
- 0 vulnerabilities (down from 8)

## 2.1.74

- Add page URL context to image validation error messages
- Fix async boolean bug in ttEveryInternalLinkStatusOk
- Fix type declarations with `declare global` and align signatures across index.d.ts files
- Add `minLinksRequired` param to ttEveryInternalLinkStatusOk type definition
- Remove `@ts-nocheck`/`@ts-ignore` directives from commands.ts, ttEveryInternalLinkIsLoading, ttValidatePageContent
- Remove dead NCA special-case logic from isInternal
- Remove unused domainMapping module and its tests
- Use URL API for credential injection instead of string splitting
- Handle protocol-relative URLs in ttGetInternalLinks normalizeUrl
- Rebuild dist files

## 2.1.73

- Add ttEl type definition with JSDoc to cypress/index.d.ts

## 2.1.72

- Add auto-getter name extraction to cy.ttEl command via stack trace parsing
- cy.ttEl now automatically logs getter names when used in page objects

## 2.1.71

- Add cy.ttEl(selector, name) command for semantic element logging
- BasePage auto-extracts getter name for logging (no name parameter needed)
- Plugin commands (tt-only-one-h1, tt-validate-language-tag) now use cy.ttEl
- Remove elContains method from BasePage

## 2.1.70

- Add BasePage abstract class for Page Object Model with semantic logging
- Implement el(selector, name?) protected method
- Shows semantic names instead of CSS selectors
- Add integration tests for BasePage functionality

## 2.1.69

- Restructure Cypress tests from monolithic validate.cy.ts to feature-based directories
- Split language tests into separate file with functional ISO format validation
- Add negative assertion test pattern using cy.on('fail') for parameter verification
- Refactor tt-get-internal-links: remove broken async function, use Set instead of Map
- Refactor tt-validate-all-images: extract helper function, fix Promise pattern
- Add project configuration: .nvmrc (Node 22), .editorconfig, engines field
- Update dependencies: vitest 4.x, cypress 15.x, typescript 5.9.x
- Enable TypeScript declarations in tsconfig.json

## 2.1.67

- Add support for 301 and 302 redirect status codes in ttEveryInternalLinkStatusOk command
- Add comprehensive test coverage for redirect handling functionality

## 2.1.66

- Remove insecure HTTP protocol support from ttGetInternalLinks command
- Improve security by defaulting to HTTPS-only

## 2.1.65

- Refactor ttEveryInternalLinkIsLoading and ttEveryInternalLinkStatusOk to use ttGetInternalLinks exclusively
- Clean up code duplication and improve command architecture

## 2.1.64

- Add automatic credential propagation for internal links when baseUrl contains Basic Auth
- Implement addCredentialsToInternalLinks utility function using URL API
- Fix CSS selector error in ttEveryInternalLinkStatusOk command
- Clean up test duplication by consolidating duplicate validate.cy.js file

## 2.1.63

- Fix cy.request() empty URL error in ttEveryInternalLinkIsLoading command
- Add validation to prevent Cypress request failures when domain mapping results in empty URLs

## 2.1.62

- Simplified isInternal function logic to fix staging/production URL detection bug
- Replaced Jest with Vitest for better performance and modern testing experience
- Improved internal link detection with simple logic: absolute paths (/), relative paths, and baseUrl matching

## 2.1.57

- Added HTTP Basic Authentication support for internal link and image validation
- Created extractAuth utility to extract authentication credentials from baseUrl
- Updated all validation commands to handle authentication in requests
- Fixed handling of baseUrls like "https://username:password@domain.com"

## 2.1.58

- Fixed ttEveryInternalLinkIsLoading command to handle anchor and non-requestable links
- Added intelligent filtering for non-requestable link types (anchors, javascript, mailto, tel, data)
- Migrated from eslint-config-standard-with-typescript to ESLint 9.x flat config
- Removed ttRunTestifyBaseTests command

## 2.1.56

- Updated Cypress to version 14.0.0
- Updated TypeScript to version 5.3.3
- Updated all npm dependencies to their latest versions
- Added CLAUDE.md with build, lint and test commands

## 2.1.49

- Update npm dependencies
- Use image validation for page validation
- Fixes for typescript

## 2.1.48

- Error console detection now detects missing CSS files as collection

## 2.1.47

- Improve image validation with better collector
- Use status instead of exist validation for images

## 2.1.44

- Add feature ttClickIfElementExist
- Update npm dependencies

## 2.1.41

- Add ttValidateSubpagesAndImages type definition

## 2.1.39

- Update npm dependencies and use ^ carets in dev dependencies

## 2.1.38

- Improve threshold test with better overview for all filetypes
- Do a reload to avoid redirect 0 bytes issue

## 2.1.37

- Fix http protocol special case in base url to get internal links from docker environment pages
- Update npm dependencies

## 2.1.36

- Fix special case for a hrefs that only have the base url like a logo

## 2.1.35

- Set default value for get internal links to 10
- Filter anchor links in get internal links

## 2.1.34

- Better console error detection with a reload of the page

## 2.1.29

- Implemented ttSetupConsoleErrorListener command

## 2.1.28

- Add page load method
- Add new test for threshold in mb
- Add cypress axe to peer dependencies
- Update npm dependencies

## 2.1.27

- Use relative path for utils

## 2.1.26

- Remove jest test from dist folder
- New build with index.d.ts file in copy

## 2.1.25

- Use index.d file in Cypress folder
- Remove no errors call in validate file
- Build with node version 18.5

## 2.1.24

- Update npm dependencies

## 2.1.23

- Use clean structure for eleventy pages

## 2.1.16

- Add new javascript error detection

## 2.1.14

- Import axe dependencies
- Improve TS files caused by jest cypress issue
- Move jest tests to root folder

## 2.1.13

- Update npm dependencies
- Add cookie example pages
- Improve TS config files
- Use cookie commands in validate test file

## 2.1.10

- ttCookieAllAcceptClick can now handle different cookie banners
- NPM dependencies updated

## 2.1.6

- Fix issue with type declaration in dist folder

## 2.1.3

- Add feature to detect internal links with validation of domain and protocol
- Add jest utils to test functions

## 2.1.2

- Use force click in accept all cookies command

## 2.1.0

- Use peer dependencies to have less problems with cypress, chai and axe

## 2.0.39

- Improve imprint command to detect all imprint links and validate if one is clickable

## 2.0.38

- Fix typescript errors
- ttElementExist boolean and null operator
- ttValidateImprint use new method signature and improve

## 2.0.37

- Add cy.clearAllLocalStorage() to everyInternalLinkIsLoading for better memory handling
- Update npm dependencies
