import { describe, test, expect, vi, beforeEach } from 'vitest'

describe('ttClickIfElementExist', () => {
  let cy: any

  beforeEach(() => {
    cy = {
      log: vi.fn(),
      get: vi.fn()
    }
    global.cy = cy
  })

  test('logs checking message', async () => {
    const mockBody = {
      find: vi.fn(() => [])
    }
    cy.get = vi.fn((sel: string) => {
      if (sel === 'body') return { then: vi.fn((cb: any) => cb(mockBody)) }
      return { click: vi.fn() }
    })

    const { ttClickIfElementExist } =
      await import('../src/commands/tt-click-if-element-exist')
    ttClickIfElementExist('.btn')
    expect(cy.log).toHaveBeenCalledWith(
      'ttClickIfElementExist - Checking if element exists: .btn'
    )
  })

  test('clicks element when found', async () => {
    const clickFn = vi.fn()
    const mockBody = {
      find: vi.fn(() => [{ length: 1 }])
    }
    cy.get = vi.fn((sel: string) => {
      if (sel === 'body') return { then: vi.fn((cb: any) => cb(mockBody)) }
      return { click: clickFn }
    })

    const { ttClickIfElementExist } =
      await import('../src/commands/tt-click-if-element-exist')
    ttClickIfElementExist('.btn')

    expect(cy.log).toHaveBeenCalledWith('Element found: .btn. Clicking...')
    expect(cy.get).toHaveBeenCalledWith('.btn')
  })

  test('skips click when element not found', async () => {
    const mockBody = {
      find: vi.fn(() => [])
    }
    cy.get = vi.fn((sel: string) => {
      if (sel === 'body') return { then: vi.fn((cb: any) => cb(mockBody)) }
      return { click: vi.fn() }
    })

    const { ttClickIfElementExist } =
      await import('../src/commands/tt-click-if-element-exist')
    ttClickIfElementExist('.missing')

    expect(cy.log).toHaveBeenCalledWith(
      'Element not found: .missing. Skipping click.'
    )
  })
})
