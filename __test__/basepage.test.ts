import { describe, test, expect, vi, beforeEach } from 'vitest'

describe('BasePage', () => {
  let cy: any

  beforeEach(() => {
    cy = {
      log: vi.fn(),
      get: vi.fn(() => 'element')
    }
    global.cy = cy
  })

  test('el method logs selector when no name provided', async () => {
    const { BasePage } = await import('../src/pages/BasePage')

    class TestPage extends BasePage {
      public testEl(selector: string) {
        return this.el(selector)
      }
    }

    const page = new TestPage()
    page.testEl('#username')

    expect(cy.log).toHaveBeenCalledWith('#username')
    expect(cy.get).toHaveBeenCalledWith('#username')
  })

  test('el method logs custom name when provided', async () => {
    const { BasePage } = await import('../src/pages/BasePage')

    class TestPage extends BasePage {
      public testEl(selector: string, name?: string) {
        return this.el(selector, name)
      }
    }

    const page = new TestPage()
    page.testEl('#username', 'usernameInput')

    expect(cy.log).toHaveBeenCalledWith('usernameInput')
  })

  test('el method returns cy.get result', async () => {
    const { BasePage } = await import('../src/pages/BasePage')

    class TestPage extends BasePage {
      public testEl(selector: string) {
        return this.el(selector)
      }
    }

    const page = new TestPage()
    const result = page.testEl('#test')

    expect(result).toBe('element')
  })

  test('BasePage is abstract', async () => {
    const { BasePage } = await import('../src/pages/BasePage')
    expect(typeof BasePage).toBe('function')
  })
})
