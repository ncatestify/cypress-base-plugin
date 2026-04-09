import { describe, test, expect, vi, beforeEach } from 'vitest'

describe('ttInvalidPath404', () => {
  let cy: any

  beforeEach(() => {
    cy = {
      log: vi.fn(),
      request: vi.fn(() => ({
        then: vi.fn((cb: any) => cb({ status: 404 }))
      }))
    }
    global.cy = cy
    vi.stubGlobal('Cypress', {
      config: vi.fn(() => 'https://example.com')
    })
  })

  test('logs command start', async () => {
    const { ttInvalidPath404 } =
      await import('../src/commands/tt-invalid-path-404')
    ttInvalidPath404()
    expect(cy.log).toHaveBeenCalledWith('ttInvalidPath404 - NCA TESTIFY')
  })

  test('requests invalid path', async () => {
    const { ttInvalidPath404 } =
      await import('../src/commands/tt-invalid-path-404')
    ttInvalidPath404()
    expect(cy.request).toHaveBeenCalledWith(
      expect.objectContaining({
        url: '/TESTIFY.invalidUrl',
        failOnStatusCode: false
      })
    )
  })

  test('asserts 404 status', async () => {
    const assertFn = vi.fn()
    global.assert = { equal: assertFn } as any

    const { ttInvalidPath404 } =
      await import('../src/commands/tt-invalid-path-404')
    ttInvalidPath404()
    expect(assertFn).toHaveBeenCalledWith(404, 404)
  })

  test('includes auth when baseUrl has credentials', async () => {
    vi.stubGlobal('Cypress', {
      config: vi.fn(() => 'https://user:pass@example.com')
    })

    const { ttInvalidPath404 } =
      await import('../src/commands/tt-invalid-path-404')
    ttInvalidPath404()
    expect(cy.request).toHaveBeenCalledWith(
      expect.objectContaining({
        auth: { username: 'user', password: 'pass' }
      })
    )
  })
})
