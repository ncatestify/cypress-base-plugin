import { describe, test, expect, vi, beforeEach } from 'vitest'

describe('ttEl', () => {
  let cy: any

  beforeEach(() => {
    cy = {
      log: vi.fn(),
      get: vi.fn(() => 'element')
    }
    global.cy = cy
  })

  test('logs selector as name when no name provided', async () => {
    const { ttEl } = await import('../src/commands/tt-el')
    ttEl('#username')
    expect(cy.log).toHaveBeenCalledWith('#username')
    expect(cy.get).toHaveBeenCalledWith('#username')
  })

  test('logs custom name when provided', async () => {
    const { ttEl } = await import('../src/commands/tt-el')
    ttEl('#username', 'usernameInput')
    expect(cy.log).toHaveBeenCalledWith('usernameInput')
    expect(cy.get).toHaveBeenCalledWith('#username')
  })

  test('returns cy.get result', async () => {
    const { ttEl } = await import('../src/commands/tt-el')
    const result = ttEl('#username')
    expect(result).toBe('element')
  })
})
