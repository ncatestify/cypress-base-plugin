let warnings: string[] = []

export const ttCheckConsoleWarnings = (): void => {
  cy.log('ttCheckConsoleWarnings - NCA TESTIFY')

  warnings = []

  cy.window().then((win) => {
    const originalWarn = win.console.warn
    win.console.warn = (...args: any[]) => {
      warnings.push(args.map((a) => String(a)).join(' '))
      originalWarn.apply(win.console, args)
    }
  })

  cy.reload()

  cy.window().should('exist')

  cy.then(() => {
    if (warnings.length > 0) {
      throw new Error(
        `Console warnings detected (${warnings.length}):\n${warnings.join('\n')}`
      )
    } else {
      cy.log('No console warnings detected')
    }
  })
}
