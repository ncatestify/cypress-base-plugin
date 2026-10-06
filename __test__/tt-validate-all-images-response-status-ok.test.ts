import { describe, test, expect, vi, beforeEach } from 'vitest'
import { ttValidateAllImagesResponseStatusOk } from '../src/commands/tt-validate-all-images-response-status-ok'

const credentialedBaseUrl = 'https://nca:nca@staging.example.com'

const makeImg = (src: string) => ({
  getAttribute: (name: string) => (name === 'src' ? src : null),
  className: '',
  classList: [],
  parentElement: null
})

const internalAbsolute = makeImg('https://staging.example.com/img/logo.png')
const internalRelative = makeImg('/img/icon.png')
const externalImage = makeImg('https://external-cdn.com/img/hero.png')
const imgs = [internalAbsolute, internalRelative, externalImage]

const chainable = (value?: unknown): any => ({
  then: (cb: any) => chainable(cb(value))
})

describe('ttValidateAllImagesResponseStatusOk', () => {
  let cy: any

  beforeEach(() => {
    vi.stubGlobal('Cypress', {
      config: vi.fn(() => credentialedBaseUrl)
    })

    cy = {
      log: vi.fn(),
      url: vi.fn(() => chainable('https://staging.example.com/de/page')),
      window: vi.fn(() => chainable({ eval: vi.fn(() => []) })),
      get: vi.fn((selector: string) => {
        if (selector === 'img') {
          return {
            each: (cb: any) => {
              imgs.forEach((img, index) => cb([img], index))
              return chainable()
            }
          }
        }
        return chainable({ find: () => imgs })
      }),
      request: vi.fn(() => chainable({ status: 200 }))
    }
    vi.stubGlobal('cy', cy)
  })

  const getRequestOptionsByUrl = (): Record<string, any> => {
    const calls = cy.request.mock.calls.map(([options]: [any]) => options)
    return Object.fromEntries(
      calls.map((options: any) => [options.url, options])
    )
  }

  test('sends basic auth only for internal images', () => {
    ttValidateAllImagesResponseStatusOk()

    const byUrl = getRequestOptionsByUrl()

    expect(byUrl['https://staging.example.com/img/logo.png'].auth).toEqual({
      username: 'nca',
      password: 'nca'
    })
  })

  test('sends basic auth for relative image paths', () => {
    ttValidateAllImagesResponseStatusOk()

    const byUrl = getRequestOptionsByUrl()

    expect(byUrl['/img/icon.png'].auth).toEqual({
      username: 'nca',
      password: 'nca'
    })
  })

  test('does not leak credentials to external image services', () => {
    ttValidateAllImagesResponseStatusOk()

    const byUrl = getRequestOptionsByUrl()

    expect(byUrl['https://external-cdn.com/img/hero.png'].auth).toBeUndefined()
  })
})
