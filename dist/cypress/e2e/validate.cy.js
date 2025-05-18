describe('Validate Testify Tests', () => {
    beforeEach(() => {
        cy.visit('/');
    });
    it('Accept all cookies on "alles" page', () => {
        cy.visit('/alles/');
        cy.ttCookieAllAcceptClick();
    });
    it('Accept all cookies on "alle" page', () => {
        cy.visit('/alle/');
        cy.ttCookieAllAcceptClick();
    });
    it('Run accessibility tests', () => {
        cy.ttAccessibility();
    });
    it('Detect HTTP connections', () => {
        cy.ttDetectHttp();
    });
    it('Check if elements exist', () => {
        cy.ttElementExists('.example-element');
    });
    it('All internal links are loading', () => {
        cy.ttEveryInternalLinkIsLoading();
    });
    it.only('All internal links have OK status', () => {
        cy.ttEveryInternalLinkStatusOk();
    });
    it('Retrieve all internal links', () => {
        cy.ttGetInternalLinks();
    });
    it('Invalid path returns 404', () => {
        cy.ttInvalidPath404();
    });
    it('Imprint link is clickable', () => {
        cy.ttValidateImprintClickable();
    });
    it('Only one H1 element exists', () => {
        cy.ttOnlyOneH1();
    });
    it('Run base tests', () => {
        cy.ttRunTestifyBaseTests();
    });
    it('Set up console error listener', () => {
        cy.visit('/console-errors/');
        cy.ttSetupConsoleErrorListener();
    });
    it('Check if multiple css files are missing', () => {
        cy.visit('/css-file-not-loading/');
        cy.ttSetupConsoleErrorListener();
    });
    it('Images have OK response status', () => {
        cy.ttValidateAllImagesResponseStatusOk();
    });
    it('Language tag is valid', () => {
        cy.ttValidateLanguageTag('en');
    });
    it('No Google services detected', () => {
        cy.ttValidateNoGoogleServices();
    });
    it('Validate page content', () => {
        cy.ttValidatePageContent();
    });
    it('Validate subpages and images', () => {
        cy.ttValidateSubpagesAndImages();
    });
    it('Check threshold', () => {
        cy.ttThreshold();
    });
    it('Example for click and not click optional css selector', () => {
        cy.visit('/alles');
        cy.ttClickIfElementExist('.example-element');
        cy.ttClickIfElementExist('.button');
    });
});
