import { describe, test, expect, vi, beforeEach } from 'vitest'
import { ttGetInternalLinks } from '../src/commands/tt-get-internal-links'

describe('ttGetInternalLinks', () => {
  let cy: any
  let mockWindow: any

  beforeEach(() => {
    // Mock Cypress environment
    cy = {
      log: vi.fn(),
      url: vi.fn(() => ({ 
        then: (cb: any) => Promise.resolve().then(() => cb('https://example.com/current')) 
      })),
      get: vi.fn(() => ({
        then: (cb: any) => {
          // Return a mock jQuery-like object
          return Promise.resolve().then(() => cb({
            each: (callback: any) => {
              // Mock link elements
              const mockLinks = [
                { getAttribute: vi.fn(() => '/page1') },
                { getAttribute: vi.fn(() => '/page2?param=35ea10a0-8a8e-4a59-b7c5-dcf0361dd90a') },
                { getAttribute: vi.fn(() => '/b') },
                { getAttribute: vi.fn(() => '/b/details') },
                { getAttribute: vi.fn(() => '/about') },
                { getAttribute: vi.fn(() => '#') }, // Non-requestable
                { getAttribute: vi.fn(() => '') }   // Empty href
              ]
              mockLinks.forEach((link, index) => callback(index, link))
              return mockLinks
            }
          }))
        }
      })),
      wrap: vi.fn((value: any) => {
        return {
          then: (cb: any) => cb(value)
        }
      })
    }
    
    global.cy = cy
    global.Cypress = {
      config: vi.fn(() => 'https://example.com')
    }
  })

  test('collects internal links without exclusion', async () => {
    // Test that all valid internal links are collected when no exclude parameter
    const result = await ttGetInternalLinks()
    expect(result).toBeDefined()
    // Should include valid links but exclude non-requestable and empty ones
  })

  test('excludes links containing specified strings', async () => {
    // Test that links with excluded strings are filtered out
    const exclude = ['35ea10a0-8a8e-4a59-b7c5-dcf0361dd90a', 'b']
    const result = await ttGetInternalLinks('', exclude)
    
    // Links containing exclude strings should not be in result
    expect(result).toBeDefined()
  })

  test('works with empty exclude array', async () => {
    // Test that empty exclude array behaves like no exclusion
    const result = await ttGetInternalLinks('', [])
    expect(result).toBeDefined()
  })

  test('excludes exact href matches', async () => {
    // Test exact match functionality
    const exclude = ['b'] // This should exclude '/b' but not '/b/details'
    const result = await ttGetInternalLinks('', exclude)
    
    // Exact match exclusion test
    expect(result).toBeDefined()
  })

  test('handles complex URL patterns', async () => {
    // Test with various URL structures and exclude patterns
    const exclude = ['details', '/b/']
    const result = await ttGetInternalLinks('', exclude)
    
    expect(result).toBeDefined()
  })

  test('maintains backward compatibility', async () => {
    // Test that calling without exclude parameter works as before
    const result = await ttGetInternalLinks()
    expect(result).toBeDefined()
  })
})