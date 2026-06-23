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
      request: vi.fn(),
      then: vi.fn((cb: any) => cb())
    }
    global.cy = cy
    ;(global as any).expect = (value: any) => ({
      to: {
        have: {
          length: vi.fn()
        }
      }
    })
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

    const urls = testCases.map((tc) => tc.url)
    const responses = Object.fromEntries(
      testCases.map((tc) => [
        tc.url,
        { status: tc.status, headers: { 'content-type': 'text/html' } }
      ])
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

    expect(cy.log).toHaveBeenCalledWith(
      '❌ Testing https://example.com/404: 404'
    )
    expect(cy.log).toHaveBeenCalledWith(
      '⚠️ Link validation failed: https://example.com/404 returned 404'
    )
  })

  test('skips non-HTML content', () => {
    setupTest(['https://example.com/file.pdf'], {
      default: { status: 200, headers: { 'content-type': 'application/pdf' } }
    })

    ttEveryInternalLinkStatusOk()

    expect(cy.log).toHaveBeenCalledWith(
      '⏭️ Testing https://example.com/file.pdf: Skipped (content-type: application/pdf)'
    )
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

  test('calls cy.then for final assertion after all requests', () => {
    setupTest(['https://example.com/ok'], {
      default: { status: 200, headers: { 'content-type': 'text/html' } }
    })

    ttEveryInternalLinkStatusOk()

    expect(cy.then).toHaveBeenCalled()
  })

  test('final assertion passes when all links are valid', () => {
    const assertionSpy = vi.fn()
    ;(global as any).expect = (value: any) => ({
      to: {
        have: {
          length: assertionSpy
        }
      }
    })

    setupTest(['https://example.com/ok'], {
      default: { status: 200, headers: { 'content-type': 'text/html' } }
    })

    ttEveryInternalLinkStatusOk()

    expect(assertionSpy).toHaveBeenCalledWith(0, expect.any(String))
  })

  test('final assertion receives failed links when status is invalid', () => {
    const assertionSpy = vi.fn()
    ;(global as any).expect = (value: any) => ({
      to: {
        have: {
          length: assertionSpy
        }
      }
    })

    setupTest(['https://example.com/404'], {
      default: { status: 404, headers: { 'content-type': 'text/html' } }
    })

    ttEveryInternalLinkStatusOk()

    expect(assertionSpy).toHaveBeenCalledWith(
      0,
      expect.stringContaining('https://example.com/404')
    )
  })

  // New tests for exclude parameter functionality
  test('calls ttGetInternalLinks with exclude parameter', () => {
    const exclude = ['35ea10a0-8a8e-4a59-b7c5-dcf0361dd90a', 'b']
    const mockUrls = ['https://example.com/page1', 'https://example.com/page2']
    
    cy.ttGetInternalLinks.mockImplementation((selector, excludeParam) => {
      expect(excludeParam).toEqual(exclude)
      return { then: (cb: any) => cb(mockUrls) }
    })
    
    setupTest(mockUrls, {
      default: { status: 200, headers: { 'content-type': 'text/html' } }
    })

    ttEveryInternalLinkStatusOk(1, exclude)
    expect(cy.ttGetInternalLinks).toHaveBeenCalledWith('', exclude)
  })

  test('excludes specified links from validation', () => {
    const exclude = ['test-id', 'b']
    // Links that would normally be included but should be excluded
    const allUrls = [
      'https://example.com/page1', 
      'https://example.com/page2?param=test-id',
      'https://example.com/b',
      'https://example.com/about'
    ]
    
    // Only URLs that don't contain exclude strings should be processed
    const expectedProcessedUrls = [
      'https://example.com/page1',
      'https://example.com/about'
    ]
    
    cy.ttGetInternalLinks.mockImplementation((selector, excludeParam) => {
      expect(excludeParam).toEqual(exclude)
      return { then: (cb: any) => cb(expectedProcessedUrls) }
    })
    
    setupTest(expectedProcessedUrls, {
      default: { status: 200, headers: { 'content-type': 'text/html' } }
    })

    ttEveryInternalLinkStatusOk(1, exclude)
    
    // Verify that only non-excluded URLs are processed
    expectedProcessedUrls.forEach(url => {
      expect(cy.request).toHaveBeenCalledWith(
        expect.objectContaining({ url })
      )
    })
  })

  test('works with empty exclude array', () => {
    const exclude: string[] = []
    const mockUrls = ['https://example.com/page1', 'https://example.com/page2']
    
    cy.ttGetInternalLinks.mockImplementation((selector, excludeParam) => {
      expect(excludeParam).toEqual(exclude)
      return { then: (cb: any) => cb(mockUrls) }
    })
    
    setupTest(mockUrls, {
      default: { status: 200, headers: { 'content-type': 'text/html' } }
    })

    ttEveryInternalLinkStatusOk(1, exclude)
    expect(cy.ttGetInternalLinks).toHaveBeenCalledWith('', exclude)
  })

  test('maintains backward compatibility without exclude parameter', () => {
    const mockUrls = ['https://example.com/page1', 'https://example.com/page2']
    
    cy.ttGetInternalLinks.mockImplementation((selector, excludeParam) => {
      expect(excludeParam).toEqual([]) // Default empty array
      return { then: (cb: any) => cb(mockUrls) }
    })
    
    setupTest(mockUrls, {
      default: { status: 200, headers: { 'content-type': 'text/html' } }
    })

    // Call without exclude parameter
    ttEveryInternalLinkStatusOk(1)
    expect(cy.ttGetInternalLinks).toHaveBeenCalledWith('', [])
  })
})
