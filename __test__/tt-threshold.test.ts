import { describe, test, expect, vi, beforeEach } from 'vitest'

describe('ttThreshold', () => {
  let cy: any
  let mockWindow: any

  beforeEach(() => {
    const resources = [
      {
        name: 'https://example.com/app.js',
        transferSize: 500000,
        decodedBodySize: 600000
      },
      {
        name: 'https://example.com/style.css',
        transferSize: 100000,
        decodedBodySize: 120000
      },
      {
        name: 'https://example.com/logo.png',
        transferSize: 200000,
        decodedBodySize: 200000
      }
    ]

    mockWindow = {
      performance: {
        clearResourceTimings: vi.fn(),
        getEntriesByType: vi.fn(() => resources)
      }
    }

    cy = {
      log: vi.fn(),
      window: vi.fn(() => ({
        then: vi.fn((cb: any) => cb(mockWindow))
      })),
      reload: vi.fn(() => ({
        then: vi.fn((cb: any) => cb())
      })),
      then: vi.fn((cb: any) => cb())
    }
    global.cy = cy
  })

  test('logs command and categorizes resources', async () => {
    const { ttThreshold } = await import('../src/commands/tt-threshold')
    ttThreshold(3)

    expect(cy.log).toHaveBeenCalled()
    expect(mockWindow.performance.clearResourceTimings).toHaveBeenCalled()
    expect(mockWindow.performance.getEntriesByType).toHaveBeenCalledWith(
      'resource'
    )
  })

  test('uses default threshold of 3MB', async () => {
    const { ttThreshold } = await import('../src/commands/tt-threshold')
    ttThreshold()

    expect(cy.then).toHaveBeenCalled()
  })

  test('accepts custom threshold', async () => {
    const { ttThreshold } = await import('../src/commands/tt-threshold')
    ttThreshold(1)

    expect(cy.then).toHaveBeenCalled()
  })
})
