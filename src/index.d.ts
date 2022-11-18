// declare global {
//   namespace Cypress {
//     interface Chainable<Subject> {
//       getInternalLinks(): String[];
//     }
//   }
// }

declare namespace Cypress {
  interface Chainable<Subject = any> {
    getInternalLinks<Subject>(): Chainable<Subject>;
  }
}
