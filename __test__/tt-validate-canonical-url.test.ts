import { describe, test, expect, vi, beforeEach } from 'vitest'

describe('ttValidateCanonicalUrl', () => {
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
    vi.stubGlobal('Cypress', {
      config: vi.fn(() => 'http://localhost:8080')
    })
  })

  test('logs command start', async () => {
    const { ttValidateCanonicalUrl } =
      await import('../src/commands/tt-validate-canonical-url')
    ttValidateCanonicalUrl()
    expect(cy.log).toHaveBeenCalledWith('ttValidateCanonicalUrl - NCA TESTIFY')
  })

  test('queries canonical link element', async () => {
    const { ttValidateCanonicalUrl } =
      await import('../src/commands/tt-validate-canonical-url')
    ttValidateCanonicalUrl()
    expect(cy.get).toHaveBeenCalledWith('head link[rel="canonical"]')
  })
})
