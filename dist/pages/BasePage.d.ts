export declare function resolveElementName(explicit: string | undefined, caller: string | null, fallback: string): string;
export declare abstract class BasePage {
    protected el(selector: string, name?: string): Cypress.Chainable<JQuery<HTMLElement>>;
    protected elContains(text: string, name?: string): Cypress.Chainable<undefined>;
    private extractCallerName;
}
