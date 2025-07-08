import { describe, test, expect, vi, beforeEach } from 'vitest'
import { ttEveryInternalLinkStatusOk } from '../src/commands/tt-every-internal-link-status-ok'

describe('ttEveryInternalLinkStatusOk', () => {
  let cy: any
  let mockRequest: any

  beforeEach(() => {
    cy = {
      log: vi.fn(),
      wrap: vi.fn(() => ({
        its: vi.fn(() => ({ should: vi.fn() }))
      })),
      ttGetInternalLinks: vi.fn(() => ({ then: (cb: any) => cb([]) })),
      request: vi.fn()
    }
    global.cy = cy
  })

  const setupTest = (urls: string[], responses: Record<string, any>) => {
    cy.ttGetInternalLinks.mockReturnValue({ then: (cb: any) => cb(urls) })
    cy.request.mockImplementation((options: any) => ({
      then: (cb: any) => cb(responses[options.url] || responses.default)
    }))
  }

  test('accepts valid status codes (200, 301, 302)', () => {
    const testCases = [
      { url: 'https://example.com/ok', status: 200 },
      { url: 'https://example.com/moved', status: 301 },
      { url: 'https://example.com/found', status: 302 }
    ]

    const urls = testCases.map(tc => tc.url)
    const responses = Object.fromEntries(
      testCases.map(tc => [tc.url, { status: tc.status, headers: { 'content-type': 'text/html' } }])
    )

    setupTest(urls, responses)
    ttEveryInternalLinkStatusOk()

    testCases.forEach(({ url, status }) => {
      expect(cy.log).toHaveBeenCalledWith(`✅ Testing ${url}: ${status}`)
    })
  })

  test('rejects invalid status codes', () => {
    setupTest(['https://example.com/404'], {
      default: { status: 404, headers: { 'content-type': 'text/html' } }
    })

    ttEveryInternalLinkStatusOk()

    expect(cy.log).toHaveBeenCalledWith('❌ Testing https://example.com/404: 404')
    expect(cy.log).toHaveBeenCalledWith('⚠️ Link validation failed: https://example.com/404 returned 404')
  })

  test('skips non-HTML content', () => {
    setupTest(['https://example.com/file.pdf'], {
      default: { status: 200, headers: { 'content-type': 'application/pdf' } }
    })

    ttEveryInternalLinkStatusOk()

    expect(cy.log).toHaveBeenCalledWith('⏭️ Testing https://example.com/file.pdf: Skipped (content-type: application/pdf)')
  })

  test('enforces minimum links requirement', () => {
    setupTest(['url1', 'url2'], {
      default: { status: 200, headers: { 'content-type': 'text/html' } }
    })
    
    cy.wrap.mockImplementation((value) => ({
      its: vi.fn(() => ({
        should: vi.fn((assertion, expected) => {
          expect(assertion).toBe('be.gte')
          expect(expected).toBe(5)
        })
      }))
    }))

    ttEveryInternalLinkStatusOk(5)
  })
})