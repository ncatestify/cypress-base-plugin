import { describe, test, expect, vi, beforeEach } from 'vitest'

describe('ttCheckConsoleWarnings', () => {
  let cy: any

  beforeEach(() => {
    cy = {
      log: vi.fn(),
      window: vi.fn(() => ({
        should: vi.fn(),
        then: vi.fn()
      })),
      reload: vi.fn(),
      then: vi.fn()
    }
    global.cy = cy
  })

  test('logs command start', async () => {
    const { ttCheckConsoleWarnings } =
      await import('../src/commands/tt-check-console-warnings')
    ttCheckConsoleWarnings()
    expect(cy.log).toHaveBeenCalledWith('ttCheckConsoleWarnings - NCA TESTIFY')
  })

  test('reloads the page', async () => {
    const { ttCheckConsoleWarnings } =
      await import('../src/commands/tt-check-console-warnings')
    ttCheckConsoleWarnings()
    expect(cy.reload).toHaveBeenCalled()
  })

  test('patches console.warn after reload', async () => {
    const mockWin = {
      console: {
        warn: vi.fn()
      }
    }
    cy.window = vi.fn(() => ({
      should: vi.fn(),
      then: (cb: Function) => {
        cb(mockWin)
        return { should: vi.fn() }
      }
    }))
    cy.then = vi.fn((cb: Function) => cb())

    const { ttCheckConsoleWarnings } =
      await import('../src/commands/tt-check-console-warnings')
    ttCheckConsoleWarnings()

    expect(typeof mockWin.console.warn).toBe('function')
    expect(mockWin.console.warn).not.toBe(vi.fn())
  })
})
