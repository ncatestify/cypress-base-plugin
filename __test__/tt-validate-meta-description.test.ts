import { describe, test, expect, vi, beforeEach } from 'vitest'

describe('ttValidateMetaDescription', () => {
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
    const { ttValidateMetaDescription } =
      await import('../src/commands/tt-validate-meta-description')
    ttValidateMetaDescription()
    expect(cy.log).toHaveBeenCalledWith(
      'ttValidateMetaDescription - NCA TESTIFY'
    )
  })

  test('queries meta description element', async () => {
    const { ttValidateMetaDescription } =
      await import('../src/commands/tt-validate-meta-description')
    ttValidateMetaDescription()
    expect(cy.get).toHaveBeenCalledWith('head meta[name="description"]')
  })
})
