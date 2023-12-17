export const ttCookieAllAcceptClick = (cookieButtonStrings = ['alle akzeptieren', 'alles akzeptieren']) => {
    cy.log('ttCookieAllAcceptClick - NCA TESTIFY');
    return cy.get('body').then(($body) => {
        // Prüfen, ob der Button außerhalb des Shadow DOMs ist
        let found = false;
        for (const buttonString of cookieButtonStrings) {
            if ($body.text().includes(buttonString)) {
                cy.log(`Found matching string: ${buttonString}`);
                cy.contains(buttonString, { matchCase: false }).click({ force: true });
                found = true;
                break;
            }
        }
        if (!found) {
            // Usercentrics Special Case: Zugriff auf den Shadow DOM
            cy.window().then((win) => {
                const shadowHost = win.document.querySelector('#usercentrics-root');
                if (shadowHost !== null) {
                    const shadowRoot = shadowHost.shadowRoot;
                    if (shadowRoot !== null) {
                        const acceptButton = shadowRoot.querySelector('[data-testid="uc-accept-all-button"]');
                        if (acceptButton !== null) {
                            cy.log('Found accept button in shadow DOM, clicking...');
                            acceptButton.click();
                            found = true;
                        }
                    }
                }
                if (!found) {
                    cy.log('No matching string found. Please open an issue at https://github.com/ncatestify/cypress-base-plugin/issues');
                    throw new Error('No matching string found. Please open an issue at https://github.com/ncatestify/cypress-base-plugin/issues');
                }
            });
        }
    });
};
