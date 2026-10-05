import { describe, test, expect, vi, beforeEach } from 'vitest'

describe('ttCheckConsoleWarnings', () => {
  let cy: any
  let cypressGlobal: any
  let beforeLoadHandler: (win: any) => void
  let graceCallback: () => void

  beforeEach(() => {
    vi.resetModules()
    graceCallback = () => {}
    cy = {
      log: vi.fn(),
      reload: vi.fn(),
      wait: vi.fn(() => ({
        then: (cb: () => void) => {
          graceCallback = cb
        }
      }))
    }
    cypressGlobal = {
      on: vi.fn((_event: string, handler: (win: any) => void) => {
        beforeLoadHandler = handler
      })
    }
    global.cy = cy
    ;(global as any).Cypress = cypressGlobal
  })

  test('logs command start', async () => {
    const { ttCheckConsoleWarnings } = await import(
      '../src/commands/tt-check-console-warnings'
    )
    ttCheckConsoleWarnings()
    expect(cy.log).toHaveBeenCalledWith('ttCheckConsoleWarnings - NCA TESTIFY')
  })

  test('installs the console.warn stub via window:before:load', async () => {
    const { ttCheckConsoleWarnings } = await import(
      '../src/commands/tt-check-console-warnings'
    )
    ttCheckConsoleWarnings()

    expect(cypressGlobal.on).toHaveBeenCalledWith(
      'window:before:load',
      expect.any(Function)
    )

    const originalWarn = vi.fn()
    const mockWin = { console: { warn: originalWarn } }
    beforeLoadHandler(mockWin)

    mockWin.console.warn('deprecated feature used')

    expect(originalWarn).toHaveBeenCalledWith('deprecated feature used')
  })

  test('passes when no warnings were collected', async () => {
    const { ttCheckConsoleWarnings } = await import(
      '../src/commands/tt-check-console-warnings'
    )
    ttCheckConsoleWarnings()

    expect(() => graceCallback()).not.to.throw()
    expect(cy.log).toHaveBeenCalledWith('No console warnings detected')
  })

  test('throws when warnings were collected', async () => {
    const { ttCheckConsoleWarnings } = await import(
      '../src/commands/tt-check-console-warnings'
    )
    ttCheckConsoleWarnings()

    const mockWin = { console: { warn: vi.fn() } }
    beforeLoadHandler(mockWin)
    mockWin.console.warn('first warning')
    mockWin.console.warn('second warning')

    expect(() => graceCallback()).toThrow(
      /Console warnings detected \(2\):\nfirst warning\nsecond warning/
    )
  })

  test('does not register the before:load listener twice', async () => {
    const { ttCheckConsoleWarnings } = await import(
      '../src/commands/tt-check-console-warnings'
    )
    ttCheckConsoleWarnings()
    ttCheckConsoleWarnings()

    expect(cypressGlobal.on).toHaveBeenCalledTimes(1)
  })
})
