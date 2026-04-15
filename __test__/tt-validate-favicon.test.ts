import { describe, test, expect, vi, beforeEach } from 'vitest'

describe('ttValidateFavicon', () => {
  let cy: any

  beforeEach(() => {
    cy = {
      log: vi.fn(),
      get: vi.fn(() => ({
        should: vi.fn(() => ({
          invoke: vi.fn(() => ({
            then: vi.fn()
          }))
        })),
        invoke: vi.fn(() => ({
          then: vi.fn()
        }))
      })),
      request: vi.fn(() => ({
        then: vi.fn()
      }))
    }
    global.cy = cy
    vi.stubGlobal('Cypress', {
      config: vi.fn(() => 'http://localhost:8080')
    })
  })

  test('logs command start', async () => {
    const { ttValidateFavicon } =
      await import('../src/commands/tt-validate-favicon')
    ttValidateFavicon()
    expect(cy.log).toHaveBeenCalledWith('ttValidateFavicon - NCA TESTIFY')
  })

  test('queries favicon link element', async () => {
    const { ttValidateFavicon } =
      await import('../src/commands/tt-validate-favicon')
    ttValidateFavicon()
    expect(cy.get).toHaveBeenCalledWith('head link[rel*="icon"]')
  })
})
