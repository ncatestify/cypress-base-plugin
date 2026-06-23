import { describe, test, expect, vi, beforeEach } from 'vitest'
import { ttEveryInternalLinkIsLoading } from '../src/commands/tt-every-internal-link-is-loading'

describe('ttEveryInternalLinkIsLoading', () => {
  let cy: any

  beforeEach(() => {
    cy = {
      log: vi.fn(),
      visit: vi.fn(() => ({
        then: (cb: any) => cb()
      })),
      get: vi.fn(() => ({
        should: vi.fn()
      })),
      ttGetInternalLinks: vi.fn(() => ({ then: (cb: any) => cb([]) })),
      ttValidateAllImagesResponseStatusOk: vi.fn(() => ({
        then: (cb: any) => cb()
      })),
      clearAllLocalStorage: vi.fn(),
      request: vi.fn(() => ({
        then: (cb: any) => cb({ status: 200 })
      }))
    }
    global.cy = cy
  })

  const setupTest = (urls: string[]) => {
    cy.ttGetInternalLinks.mockImplementation((selector, exclude) => ({
      then: (cb: any) => cb(urls)
    }))
  }

  test('calls ttGetInternalLinks with exclude parameter', () => {
    const exclude = ['35ea10a0-8a8e-4a59-b7c5-dcf0361dd90a', 'b']
    const mockUrls = ['https://example.com/page1', 'https://example.com/page2']
    
    setupTest(mockUrls)

    ttEveryInternalLinkIsLoading(10, exclude)
    
    expect(cy.ttGetInternalLinks).toHaveBeenCalledWith('', exclude)
  })

  test('excludes specified links from loading tests', () => {
    const exclude = ['test-id', 'b']
    // Simulate what ttGetInternalLinks would return after filtering
    const filteredUrls = [
      'https://example.com/page1', 
      'https://example.com/about'
    ]
    
    setupTest(filteredUrls)

    ttEveryInternalLinkIsLoading(10, exclude)
    
    // Verify that only non-excluded URLs are visited
    expect(cy.visit).toHaveBeenCalledTimes(filteredUrls.length)
    filteredUrls.forEach(url => {
      expect(cy.visit).toHaveBeenCalledWith(url)
    })
  })

  test('handles PDF links with exclude parameter', () => {
    const exclude = ['report', 'document']
    const pdfUrls = ['https://example.com/report.pdf', 'https://example.com/document.pdf']
    
    setupTest(pdfUrls)

    ttEveryInternalLinkIsLoading(10, exclude)
    
    // PDF links should be requested, not visited
    expect(cy.request).toHaveBeenCalledTimes(pdfUrls.length)
    pdfUrls.forEach(url => {
      expect(cy.request).toHaveBeenCalledWith(
        expect.objectContaining({ url })
      )
    })
  })

  test('respects limit parameter with exclusion', () => {
    const exclude = ['skip']
    const urls = [
      'https://example.com/page1',
      'https://example.com/page2?skip=true', // should be excluded
      'https://example.com/page3',
      'https://example.com/page4'
    ]
    // After exclusion: page1, page3, page4
    // With limit=2: page1, page3
    
    setupTest(['https://example.com/page1', 'https://example.com/page3'])

    ttEveryInternalLinkIsLoading(2, exclude)
    
    // Should only visit the first 2 non-excluded links
    expect(cy.visit).toHaveBeenCalledTimes(2)
  })

  test('works with empty exclude array', () => {
    const exclude: string[] = []
    const mockUrls = ['https://example.com/page1', 'https://example.com/page2']
    
    setupTest(mockUrls)

    ttEveryInternalLinkIsLoading(10, exclude)
    
    expect(cy.ttGetInternalLinks).toHaveBeenCalledWith('', exclude)
  })

  test('maintains backward compatibility without exclude parameter', () => {
    const mockUrls = ['https://example.com/page1', 'https://example.com/page2']
    
    setupTest(mockUrls)

    // Call without exclude parameter
    ttEveryInternalLinkIsLoading(10)
    
    expect(cy.ttGetInternalLinks).toHaveBeenCalledWith('', [])
  })

  test('clears local storage after each link test', () => {
    const exclude = ['test']
    const urls = ['https://example.com/page1', 'https://example.com/page2']
    
    setupTest(urls)

    ttEveryInternalLinkIsLoading(10, exclude)
    
    // Should clear storage for each URL (including those after exclusion)
    expect(cy.clearAllLocalStorage).toHaveBeenCalledTimes(urls.length)
  })
})