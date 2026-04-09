import { describe, test, expect, vi, beforeEach } from 'vitest'

describe('ttDetectHttp', () => {
  let cy: any
  let assertObj: any

  beforeEach(() => {
    assertObj = {
      notInclude: vi.fn()
    }
    cy = {
      log: vi.fn(),
      get: vi.fn(() => ({
        each: vi.fn((cb: any) => {
          const mockElement = {
            invoke: vi.fn(() => ({
              then: vi.fn()
            }))
          }
          return { each: vi.fn() }
        })
      }))
    }
    global.cy = cy
    global.assert = assertObj
  })

  test('logs command start', async () => {
    const { ttDetectHttp } = await import('../src/commands/tt-detect-http')
    ttDetectHttp()
    expect(cy.log).toHaveBeenCalledWith('ttDetectHttp - NCA TESTIFY')
  })

  test('calls cy.get with a selector', async () => {
    const { ttDetectHttp } = await import('../src/commands/tt-detect-http')
    ttDetectHttp()
    expect(cy.get).toHaveBeenCalledWith('a')
  })
})
