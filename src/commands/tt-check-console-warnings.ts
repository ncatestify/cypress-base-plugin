let warnings: string[] = []
let listenerRegistered = false

const collectConsoleWarnings = (win: Window): void => {
  const typedWin = win as Window & typeof globalThis
  const originalWarn = typedWin.console.warn

  typedWin.console.warn = (...args: unknown[]) => {
    warnings.push(args.map((arg) => String(arg)).join(' '))
    originalWarn.apply(typedWin.console, args)
  }
}

export const ttCheckConsoleWarnings = (): void => {
  cy.log('ttCheckConsoleWarnings - NCA TESTIFY')

  // Clear warnings of a previous command call
  warnings = []

  // The console.warn stub must be installed before any application
  // code runs, otherwise warnings printed during page load are lost.
  // A reload creates a fresh window, so window:before:load
  // re-installs the stub.
  if (!listenerRegistered) {
    Cypress.on('window:before:load', collectConsoleWarnings)
    listenerRegistered = true
  }

  cy.reload()

  // eslint-disable-next-line cypress/no-unnecessary-waiting -- grace period catches warnings emitted by delayed scripts after reload
  cy.wait(500).then(() => {
    if (warnings.length > 0) {
      throw new Error(
        `Console warnings detected (${warnings.length}):\n${warnings.join('\n')}`
      )
    } else {
      cy.log('No console warnings detected')
    }
  })
}
