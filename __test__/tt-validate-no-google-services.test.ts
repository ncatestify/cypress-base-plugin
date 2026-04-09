import { describe, test, expect, vi, beforeEach } from 'vitest'

describe('ttValidateNoGoogleServices', () => {
  let cy: any
  let requestHandler: any

  beforeEach(() => {
    cy = {
      log: vi.fn(),
      on: vi.fn((_event: string, cb: any) => {
        requestHandler = cb
      }),
      reload: vi.fn()
    }
    global.cy = cy
    vi.stubGlobal('Cypress', {
      config: vi.fn(() => 'https://example.com')
    })
  })

  test('registers request listener', async () => {
    const { ttValidateNoGoogleServices } =
      await import('../src/commands/tt-validate-no-google-services')
    ttValidateNoGoogleServices()
    expect(cy.on).toHaveBeenCalledWith('request', expect.any(Function))
  })

  test('reloads the page', async () => {
    const { ttValidateNoGoogleServices } =
      await import('../src/commands/tt-validate-no-google-services')
    ttValidateNoGoogleServices()
    expect(cy.reload).toHaveBeenCalled()
  })

  test('logs external URLs that are not Google', async () => {
    const { ttValidateNoGoogleServices } =
      await import('../src/commands/tt-validate-no-google-services')
    ttValidateNoGoogleServices()

    const nonGoogleReq = { url: 'https://cdn.example.com/script.js' }
    requestHandler(nonGoogleReq)
    expect(cy.log).toHaveBeenCalledWith(
      'External url: https://cdn.example.com/script.js'
    )
  })

  test('detects Google Fonts URLs', async () => {
    const { ttValidateNoGoogleServices } =
      await import('../src/commands/tt-validate-no-google-services')
    ttValidateNoGoogleServices()

    const googleReq = { url: 'https://fonts.googleapis.com/css' }
    expect(() => requestHandler(googleReq)).toThrow()
  })

  test('detects gstatic URLs', async () => {
    const { ttValidateNoGoogleServices } =
      await import('../src/commands/tt-validate-no-google-services')
    ttValidateNoGoogleServices()

    const gstaticReq = { url: 'https://fonts.gstatic.com/s/roboto' }
    expect(() => requestHandler(gstaticReq)).toThrow()
  })

  test('ignores internal URLs', async () => {
    const { ttValidateNoGoogleServices } =
      await import('../src/commands/tt-validate-no-google-services')
    ttValidateNoGoogleServices()

    const internalReq = { url: 'https://example.com/page' }
    requestHandler(internalReq)
    expect(cy.log).not.toHaveBeenCalledWith(
      'External url: https://example.com/page'
    )
  })
})
