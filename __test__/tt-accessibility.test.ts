import { describe, test, expect, vi, beforeEach } from 'vitest'

describe('ttAccessibility', () => {
  let cy: any

  beforeEach(() => {
    cy = {
      log: vi.fn(),
      injectAxe: vi.fn(),
      checkA11y: vi.fn()
    }
    global.cy = cy
  })

  test('logs command start', async () => {
    const { ttAccessibility } = await import('../src/commands/tt-accessibility')
    ttAccessibility()
    expect(cy.log).toHaveBeenCalledWith('ttAccessibility - NCA TESTIFY')
  })

  test('calls injectAxe', async () => {
    const { ttAccessibility } = await import('../src/commands/tt-accessibility')
    ttAccessibility()
    expect(cy.injectAxe).toHaveBeenCalled()
  })

  test('calls checkA11y', async () => {
    const { ttAccessibility } = await import('../src/commands/tt-accessibility')
    ttAccessibility()
    expect(cy.checkA11y).toHaveBeenCalled()
  })
})
