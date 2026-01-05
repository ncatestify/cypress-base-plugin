export declare abstract class BasePage {
  protected el(
    selector: string,
    name?: string
  ): Cypress.Chainable<JQuery<HTMLElement>>
  private extractGetterName
}
