import { describe, test, expect, vi, beforeEach } from 'vitest'

describe('ttValidateViewportMeta', () => {
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
      }))
    }
    global.cy = cy
  })

  test('logs command start', async () => {
    const { ttValidateViewportMeta } =
      await import('../src/commands/tt-validate-viewport-meta')
    ttValidateViewportMeta()
    expect(cy.log).toHaveBeenCalledWith('ttValidateViewportMeta - NCA TESTIFY')
  })

  test('queries viewport meta element', async () => {
    const { ttValidateViewportMeta } =
      await import('../src/commands/tt-validate-viewport-meta')
    ttValidateViewportMeta()
    expect(cy.get).toHaveBeenCalledWith('head meta[name="viewport"]')
  })
})
