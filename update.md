# Update md file

2.1.63

- Fix cy.request() empty URL error in ttEveryInternalLinkIsLoading command
- Add validation to prevent Cypress request failures when domain mapping results in empty URLs
- Improve error handling and logging for URL validation in link testing

2.1.62

- Simplified isInternal function logic to fix staging/production URL detection bug
- Removed complex domain mapping system that caused incorrect URL identification
- Fixed issue where production URLs were incorrectly identified as internal on staging environments
- Simplified ttGetInternalLinks command by removing unnecessary URL manipulation and auth handling
- Replaced Jest with Vitest for better performance and modern testing experience
- Updated all unit tests to use Vitest syntax and configuration
- Improved internal link detection with simple logic: absolute paths (/), relative paths, and baseUrl matching
- Enhanced test coverage for staging vs production URL scenarios

2.1.61

- Added universal domain mapping for staging environments
- Enhanced tt-every-internal-link-status-ok command with configurable domain mappings
- Enhanced tt-every-internal-link-is-loading command with configurable domain mappings  
- Enhanced tt-get-internal-links command with cross-domain link detection
- Added automatic staging pattern detection (staging., test., dev., qa. subdomains)
- Introduced configurable minimum links requirement (default: 1, removing hardcoded >2 limit)
- Added new DomainMappingConfig interface with mappings, autoDetectFromBaseUrl, includedDomains options
- Created domainMapping utility with comprehensive unit tests (18 test cases)
- Maintained full backwards compatibility with existing API
- Added support for external domain inclusion in link detection
- Enhanced logging for better debugging of domain mapping process

2.1.60

- Fixed TypeScript build configuration to output files to correct dist structure
- Updated tsconfig.json rootDir from "." to "./src" to prevent dist/src/ nesting
- Fixed package structure issue where main: "dist/index.js" expected files at dist/ but TypeScript built to dist/src/
- Resolved module import failures when plugin is installed via npm
- Added @ts-ignore for internal command type references in tt-every-internal-link-is-loading.ts

2.1.59

- Fixed dist file compilation error by removing stale tt-run-testify-base-tests import
- Rebuilt project to properly sync source files with distribution files
- Resolved build errors caused by outdated references in compiled JavaScript files

2.1.58

- Fixed ttEveryInternalLinkIsLoading command to handle anchor and non-requestable links
- Refactored command to directly scan page links instead of relying on ttGetInternalLinks
- Added intelligent filtering for non-requestable link types:
  - Anchor links (href="#" and href="#section")
  - JavaScript links (href="javascript:void(0)", etc.)
  - Email links (href="mailto:...")
  - Phone links (href="tel:...")
  - Data URLs (href="data:...")
- Improved code organization with clean helper functions
- Added comprehensive test coverage for anchor link handling
- Updated TypeScript definitions to include optional limit parameter
- Enhanced documentation with examples and notes about special link handling
- Updated npm dependencies to latest versions:
  - @types/jest: ^29.5.14 → ^30.0.0
  - @typescript-eslint/eslint-plugin: ^6.4.0 → ^8.18.2
  - @typescript-eslint/parser: Added ^8.18.2
  - cypress: ^14.3.3 → ^14.4.1
  - eslint: ^8.57.1 → ^9.17.0
  - eslint-plugin-cypress: ^2.15.2 → ^5.1.0
  - eslint-plugin-n: ^16.6.2 → ^17.15.1
  - eslint-plugin-promise: ^6.6.0 → ^7.2.1
  - jest: ^29.7.0 → ^30.0.0
  - ts-jest: ^29.3.4 → ^29.4.0
  - Added @eslint/js: ^9.17.0
  - Added globals: ^16.2.0
- Migrated from eslint-config-standard-with-typescript to ESLint 9.x flat config
- Created comprehensive ESLint configuration supporting TypeScript, Cypress, and Jest environments
- Removed ttRunTestifyBaseTests command and updated documentation with individual command examples

2.1.57

- Added HTTP Basic Authentication support for internal link and image validation
- Created extractAuth utility to extract authentication credentials from baseUrl
- Updated ttEveryInternalLinkStatusOk command to handle authentication in requests
- Updated ttValidateAllImagesResponseStatusOk command to handle authentication in image requests
- Updated ttInvalidPath404 command to handle authentication
- Enhanced ttGetInternalLinks command to properly construct URLs with authentication
- Improved isInternal function to correctly handle URLs with authentication credentials
- Fixed handling of baseUrls like "https://username:password@domain.com" in all validation commands
- Updated npm dependencies:
  - @types/jest: ^29.5.12 → ^29.5.14
  - cypress: ^14.0.0 → ^14.3.3
  - eslint-plugin-import: ^2.29.1 → ^2.31.0
  - prettier: ^3.2.5 → ^3.5.3
  - rimraf: ^5.0.5 → ^6.0.1
  - ts-jest: ^29.1.2 → ^29.3.4
  - typescript: ^5.3.3 → ^5.8.3

2.1.56

- Updated Cypress to version 14.0.0
- Updated TypeScript to version 5.3.3 (from 4.9.5)
- Fixed dependency conflict between TypeScript versions
- Updated all npm dependencies to their latest versions
- Updated cypress.config.js and cypress.config.ts for Cypress 14 compatibility
- Improved type definitions for all custom commands
- Added skipLibCheck option to tsconfig.json
- Added 'v14' to APIVersion enum
- Added CLAUDE.md with build, lint and test commands

2.1.55
2.1.54
2.1.53
2.1.52
2.1.51
2.1.50

- Update npm dependencies

  2.1.49

- Update npm dependencies
- Use also image validation for for page validation
- Fixes for typescript

  2.1.48

- Error console detection now can detect missing CSS files as collection

  2.1.47

- Improve image validation with better collector
- Use status instead of exist validation for images

  2.1.46

- Update npm dependencies

  2.1.45

- Fix file name for ttClickIfElementExist

  2.1.44

- Add feature ttClickIfElementExist
- Update npm dependencies

  2.1.43

- Add ttValidateSubpagesAndImages to src/index.d.ts file

  2.1.41

- Add new test ttValidateSubpagesAndImages
- Order type definitions and validation tests by method names
- Fix prettier

  2.1.39

- Update npm dependencies und use ^ carets in dev dependencies

  2.1.38

- Improve threshold test with better overview for all filetypes
- Do a reload to avoid redirect 0 bytes issue

  2.1.37

- Fix http protocol spacial case in base url to get internal links from docker environment pages
- Update nmp dependencies

  2.1.36

- Fix specual case for a hrefs that only have the base url like a logo

  2.1.35

- Set detault value for get internal links to 10.
- Filter anchor links in get internal links.

  2.1.34

  2.1.34

- Make better console error detection with a reload of the page.

  2.1.33

- Fix path in validate test file for console error detection.

  2.1.32

- Console error collector now uses a more robust error detection mechanism: The console error collector now uses a more robust error detection mechanism to capture and record any console errors that occur during the execution of tests. This ensures that any unexpected errors are caught and logged, allowing for quick identification and resolution of issues.
- Update npm dependencies: The npm dependencies have been updated to ensure compatibility with the latest versions of the packages used in the project. This ensures that the project remains up-to-date and benefits from the latest features and improvements.

  2.1.31
  Updated cy.ttValidateLanguageTag command to use 'de' as default language

  2.1.30
  Adds type checking in ttThreshold function to optimize performance measurement

A type check has been added in the ttThreshold function to ensure that the 'encodedBodySize' property is only accessed when the PerformanceEntry object is indeed an instance of PerformanceResourceTiming. This prevents runtime errors and improves the accuracy of the performance measurement.

The change affects the way the total size of loaded resources is calculated. Previously, it attempted to access the 'encodedBodySize' property from every PerformanceEntry object, which could lead to errors if the object was not an instance of PerformanceResourceTiming. With the new change, this property is only accessed when the object is indeed an instance of PerformanceResourceTiming.

This change should improve the accuracy of the performance measurement and prevent potential errors in calculating the total size of loaded resources.

2.1.29

Implemented Console Error Detection Command: Introduced a new Cypress command, ttSetupConsoleErrorListener, designed to monitor and capture any console errors that occur during the execution of tests. This command sets up listeners for uncaught exceptions and console errors, providing a robust way to ensure that our applications behave as expected without producing unintended errors in the console.

Enhanced Error Handling Mechanism: By registering an uncaught:exception handler, we've strengthened our error handling mechanism. This allows us to catch and record unexpected errors that occur during page execution, which are often indicative of underlying issues in the application code.

Automated Error Verification Post-Test Execution: The command also includes an automated verification step that runs after each test. It checks if any console errors were captured and, if so, fails the test with a detailed error message. This ensures that issues are caught early in the development cycle, promoting higher code quality and stability.

Streamlined Test Setup: The introduction of ttSetupConsoleErrorListener simplifies the test setup process by encapsulating error detection and handling within a single, reusable command. This reduces boilerplate code and enhances test readability and maintainability.

Updated Documentation and Examples: To support the adoption of the new command, we've updated our documentation to include clear instructions and examples on how to integrate ttSetupConsoleErrorListener into existing tests. This ensures that teams can quickly benefit from improved error detection capabilities.

2.1.28

- Add page load method
- Add new test for threshold in mb
- Add cypress axe to peer dependencies
- Update npm dependencies

  2.1.27

- Use relative path for utils

  2.1.26

- Remove jest test from dist folder
- New build with index.d.ts file in copy

  2.1.25

- Use index.d file in Cypress folder
- Remove no errors call in validate file
- Build with node version 18.5

  2.1.24
  Update npm dependencies.

  2.1.23
  Use clean structure for eleventy pages.

  2.1.21

- Optimized module imports: Refactored the import statements to ensure efficient module resolution and to avoid potential conflicts.

- Streamlined build process: Adjusted the build configuration to enhance the compilation process, ensuring that only necessary files are included in the final build.

- Improved module format: Transitioned to a more suitable module format for the project's context, enhancing compatibility and performance.

  2.1.20

Enhanced isInternal function for compatibility with both Cypress and Jest environments: The function now dynamically determines the base URL by checking the execution context. In a Cypress context, it uses Cypress.config('baseUrl'), while in a Jest context, it falls back to process.env.BASE_URL or a default value. This update ensures consistent behavior of the isInternal function across different testing environments, enhancing its reliability and flexibility.

2.1.19

- Adjusted isInternal function to utilize Cypress context: The isInternal function has been updated to directly use the baseUrl from Cypress configuration. This ensures accurate determination of internal URLs within the Cypress testing environment.

- Removed reliance on process.env.BASE_URL: The function now exclusively relies on Cypress.config('baseUrl'), eliminating potential inconsistencies when running in different environments.

- Streamlined URL checking logic: Enhanced the URL comparison mechanism to more effectively differentiate between internal and external links, improving the accuracy of tests that rely on URL validation.

- Optimized handling of relative URLs: The function now correctly interprets and processes relative URLs by appending them to the base URL, ensuring consistent behavior across different types of links.

- Ensured compatibility with Cypress-only context: The updates focus solely on the Cypress environment, aligning with the specific requirements and configurations of Cypress-based projects.

  2.1.18

- Update npm dependencies

  2.1.16

- Add new javascript error detection

  2.1.14

- Import axe dependencies
- Delete ckkie html file
- Improve TS files caused by jest cypress issue
- Move jest tests to root folder
- Use inline ts check ignore statements

  2.1.13

- Update npm dependencies
- Add cookie example pages
- Improve TS config files.
- Use cookie commands in validate test file
- Cleanup example pages

  2.1.12 Update npm dependencies.
  2.1.11
  User centrics cookie banner is now supported.
  2.1.10
  ttCookieAllAcceptClick can now handle different cookie banners.
  NPM dependencies updated.
  Add new cookie pages to testing page.
  2.1.6
  Fix issue with type delclaration in dist folder.
  2.1.3
  Add feature to detect internal links with validation of domain and protocol.
  Add jest utils to test functions.
  Add testing infos for static code analysis to readme file.
  2.1.2
  Use force click in accept all cookies command.
  2.1.0
  Use peer dependencies to have less problems with cypress, chai and axe.

  2.0.39
  Improve imprint command to detect all imprint links and validate if one is clickable.

  2.0.38
  Fix typescript errors

- ttElementExist boolean and null operator.
- ttValidateImprint use new method signature and improve.

  2.0.37
  Do something for the planet

- Add cy.clearAllLocalStorage() to everyInternalLinkIsLoading for better memory handling.
- Update npm dependencies.
