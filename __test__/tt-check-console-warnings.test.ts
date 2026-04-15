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
})
