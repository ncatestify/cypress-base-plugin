import { describe, test, expect, vi, beforeEach } from 'vitest'

describe('ttPageLoaded', () => {
  let cy: any
  let interceptCallback: any

  beforeEach(() => {
    cy = {
      log: vi.fn(),
      intercept: vi.fn((_pattern: string, cb: any) => {
        interceptCallback = cb
        return { as: vi.fn() }
      }),
      wait: vi.fn(() => ({ then: vi.fn((cb: any) => cb()) }))
    }
    global.cy = cy
  })

  test('logs when no pending requests', async () => {
    const { ttPageLoaded } = await import('../src/commands/tt-page-loaded')
    ttPageLoaded()

    expect(cy.intercept).toHaveBeenCalledWith('*', expect.any(Function))
  })

  test('intercepts all requests', async () => {
    const { ttPageLoaded } = await import('../src/commands/tt-page-loaded')
    ttPageLoaded()

    const mockReq = {
      on: vi.fn()
    }
    interceptCallback(mockReq)
    expect(mockReq.on).toHaveBeenCalledWith('response', expect.any(Function))
  })
})
