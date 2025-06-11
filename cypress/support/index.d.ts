declare namespace Cypress {
  interface Chainable {
    attachFile(file: string, subjectType?: string): Chainable<Element>;
  }
} 