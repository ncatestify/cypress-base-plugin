# Update md file
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
