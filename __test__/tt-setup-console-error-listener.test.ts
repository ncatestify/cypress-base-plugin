import { describe, test, expect, vi, beforeEach } from 'vitest'

describe('ttSetupConsoleErrorListener', () => {
  let cy: any
  let cypressGlobal: any
  let beforeLoadHandler: (win: any) => void
  let graceCallback: () => void
  let interceptCallback: (req: any) => void
  let responseCallback: (res: any) => void

  const createMockWindow = () => {
    const listeners: Record<string, Function> = {}
    const win = {
      console: { error: vi.fn() },
      addEventListener: vi.fn((event: string, handler: Function) => {
        listeners[event] = handler
      })
    }
    return { win, listeners }
  }

  beforeEach(() => {
    vi.resetModules()
    graceCallback = () => {}
    responseCallback = () => {}
    cy = {
      log: vi.fn(),
      reload: vi.fn(),
      intercept: vi.fn((_pattern: string, cb: (req: any) => void) => {
        interceptCallback = cb
        return { as: vi.fn() }
      }),
      wait: vi.fn(() => ({
        then: (cb: () => void) => {
          graceCallback = cb
        }
      }))
    }
    cypressGlobal = {
      on: vi.fn((_event: string, handler: (win: any) => void) => {
        beforeLoadHandler = handler
      })
    }
    global.cy = cy
    ;(global as any).Cypress = cypressGlobal
  })

  test('logs command start', async () => {
    const { ttSetupConsoleErrorListener } = await import(
      '../src/commands/tt-setup-console-error-listener'
    )
    ttSetupConsoleErrorListener()
    expect(cy.log).toHaveBeenCalledWith(
      'ttSetupConsoleErrorListener - NCA TESTIFY'
    )
  })

  test('installs all collectors via window:before:load', async () => {
    const { ttSetupConsoleErrorListener } = await import(
      '../src/commands/tt-setup-console-error-listener'
    )
    ttSetupConsoleErrorListener()

    expect(cypressGlobal.on).toHaveBeenCalledWith(
      'window:before:load',
      expect.any(Function)
    )

    const { win, listeners } = createMockWindow()
    beforeLoadHandler(win)

    expect(win.addEventListener).toHaveBeenCalledWith(
      'error',
      expect.any(Function),
      true
    )
    expect(win.addEventListener).toHaveBeenCalledWith(
      'unhandledrejection',
      expect.any(Function)
    )
    expect(listeners.error).toBeDefined()
    expect(listeners.unhandledrejection).toBeDefined()
  })

  test('intercepts all requests and tracks network errors', async () => {
    const { ttSetupConsoleErrorListener } = await import(
      '../src/commands/tt-setup-console-error-listener'
    )
    ttSetupConsoleErrorListener()

    const mockReq = {
      url: 'http://localhost:8080/broken.css',
      on: vi.fn((event: string, cb: (res: any) => void) => {
        if (event === 'response') {
          responseCallback = cb
        }
      })
    }
    interceptCallback(mockReq)
    expect(mockReq.on).toHaveBeenCalledWith('response', expect.any(Function))

    responseCallback({ statusCode: 404 })
    expect(() => graceCallback()).toThrow(
      'Network error: 404 - http://localhost:8080/broken.css'
    )
  })

  test('collects console.error calls', async () => {
    const { ttSetupConsoleErrorListener } = await import(
      '../src/commands/tt-setup-console-error-listener'
    )
    ttSetupConsoleErrorListener()

    const { win } = createMockWindow()
    beforeLoadHandler(win)
    win.console.error('something broke', 42)

    expect(() => graceCallback()).toThrow(/console\.error: something broke 42/)
  })

  test('collects runtime errors with location', async () => {
    const { ttSetupConsoleErrorListener } = await import(
      '../src/commands/tt-setup-console-error-listener'
    )
    ttSetupConsoleErrorListener()

    const { win, listeners } = createMockWindow()
    beforeLoadHandler(win)

    listeners.error({
      target: win,
      message: 'js boom',
      filename: 'http://localhost:8080/app.js',
      lineno: 7
    })

    expect(() => graceCallback()).toThrow(
      /Console error: js boom \(http:\/\/localhost:8080\/app\.js:7\)/
    )
  })

  test('collects resource load errors in capture phase', async () => {
    const { ttSetupConsoleErrorListener } = await import(
      '../src/commands/tt-setup-console-error-listener'
    )
    ttSetupConsoleErrorListener()

    const { win, listeners } = createMockWindow()
    beforeLoadHandler(win)

    listeners.error({ target: { tagName: 'IMG', src: '/missing.jpg' } })

    expect(() => graceCallback()).toThrow('Resource error: IMG /missing.jpg')
  })

  test('collects unhandled promise rejections', async () => {
    const { ttSetupConsoleErrorListener } = await import(
      '../src/commands/tt-setup-console-error-listener'
    )
    ttSetupConsoleErrorListener()

    const { win, listeners } = createMockWindow()
    beforeLoadHandler(win)

    listeners.unhandledrejection({ reason: new Error('rejected promise') })

    expect(() => graceCallback()).toThrow(
      'Unhandled rejection: rejected promise'
    )
  })

  test('passes when no errors were collected', async () => {
    const { ttSetupConsoleErrorListener } = await import(
      '../src/commands/tt-setup-console-error-listener'
    )
    ttSetupConsoleErrorListener()

    expect(() => graceCallback()).not.to.throw()
  })

  test('clears errors of a previous command call', async () => {
    const { ttSetupConsoleErrorListener } = await import(
      '../src/commands/tt-setup-console-error-listener'
    )
    ttSetupConsoleErrorListener()

    const { win } = createMockWindow()
    beforeLoadHandler(win)
    win.console.error('old error')

    // Second call must reset the collected errors
    ttSetupConsoleErrorListener()
    expect(() => graceCallback()).not.to.throw()
  })

  test('does not register the before:load listener twice', async () => {
    const { ttSetupConsoleErrorListener } = await import(
      '../src/commands/tt-setup-console-error-listener'
    )
    ttSetupConsoleErrorListener()
    ttSetupConsoleErrorListener()

    expect(cypressGlobal.on).toHaveBeenCalledTimes(1)
  })
})
