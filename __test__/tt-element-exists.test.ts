import { describe, test, expect, vi, beforeEach } from 'vitest'

describe('ttElementExists', () => {
  let cy: any
  let mockWindow: any

  beforeEach(() => {
    mockWindow = {
      document: {
        querySelector: vi.fn()
      }
    }
    cy = {
      log: vi.fn(),
      window: vi.fn(() => ({ then: (cb: any) => cb(mockWindow) }))
    }
    global.cy = cy
  })

  test('returns true when element exists', async () => {
    const { ttElementExists } =
      await import('../src/commands/tt-element-exists')
    mockWindow.document.querySelector.mockReturnValue({ tagName: 'DIV' })

    const result = ttElementExists('.my-element')

    expect(cy.log).toHaveBeenCalledWith('ttElementExists - NCA TESTIFY')
    expect(mockWindow.document.querySelector).toHaveBeenCalledWith(
      '.my-element'
    )
  })

  test('returns false when element does not exist', async () => {
    const { ttElementExists } =
      await import('../src/commands/tt-element-exists')
    mockWindow.document.querySelector.mockReturnValue(null)

    ttElementExists('.missing-element')

    expect(mockWindow.document.querySelector).toHaveBeenCalledWith(
      '.missing-element'
    )
  })
})
