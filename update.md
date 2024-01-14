# Update md file

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
