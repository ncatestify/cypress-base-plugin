import { describe, test, expect, vi, beforeEach } from 'vitest'

describe('ttOnlyOneH1', () => {
  let cy: any

  beforeEach(() => {
    cy = {
      log: vi.fn(),
      ttEl: vi.fn(() => ({
        its: vi.fn(() => ({
          should: vi.fn()
        }))
      }))
    }
    global.cy = cy
  })

  test('logs command start', async () => {
    const { ttOnlyOneH1 } = await import('../src/commands/tt-only-one-h1')
    ttOnlyOneH1()
    expect(cy.log).toHaveBeenCalledWith('ttOnlyOneH1 - NCA TESTIFY')
  })

  test('calls ttEl with h1 selector', async () => {
    const { ttOnlyOneH1 } = await import('../src/commands/tt-only-one-h1')
    ttOnlyOneH1()
    expect(cy.ttEl).toHaveBeenCalledWith('h1', 'h1Heading')
  })

  test('asserts exactly one h1', async () => {
    const shouldFn = vi.fn()
    cy.ttEl = vi.fn(() => ({
      its: vi.fn(() => ({
        should: shouldFn
      }))
    }))
    global.cy = cy

    const { ttOnlyOneH1 } = await import('../src/commands/tt-only-one-h1')
    ttOnlyOneH1()
    expect(shouldFn).toHaveBeenCalledWith('eq', 1)
  })
})
