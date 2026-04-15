import { describe, test, expect, vi, beforeEach } from 'vitest'

describe('ttValidateTitleTag', () => {
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
    const { ttValidateTitleTag } =
      await import('../src/commands/tt-validate-title-tag')
    ttValidateTitleTag()
    expect(cy.log).toHaveBeenCalledWith('ttValidateTitleTag - NCA TESTIFY')
  })

  test('queries title element', async () => {
    const { ttValidateTitleTag } =
      await import('../src/commands/tt-validate-title-tag')
    ttValidateTitleTag()
    expect(cy.get).toHaveBeenCalledWith('head title')
  })
})
