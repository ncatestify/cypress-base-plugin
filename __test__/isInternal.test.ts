import { describe, test, expect, beforeEach, afterEach } from 'vitest'
import { isInternal } from '../src/utils/isInternal'

describe('isInternal', () => {
  const testCases = [
    { name: 'absolute paths are internal', url: '/page', expected: true },
    { name: 'relative paths are internal', url: 'page', expected: true },
    {
      name: 'URLs starting with baseUrl are internal',
      url: 'https://example.com/page',
      baseUrl: 'https://example.com',
      expected: true
    },
    {
      name: 'URLs not starting with baseUrl are external',
      url: 'https://other.com/page',
      baseUrl: 'https://example.com',
      expected: false
    },
    {
      name: 'staging vs production - staging baseUrl excludes production URLs',
      url: 'https://nevercodealone.de/page',
      baseUrl: 'https://testingcrud.testify.projects.nevercodealone.de/',
      expected: false
    },
    {
      name: 'staging vs production - production baseUrl excludes staging URLs',
      url: 'https://testingcrud.testify.projects.nevercodealone.de/page',
      baseUrl: 'https://nevercodealone.de/',
      expected: false
    }
  ]

  testCases.forEach(({ name, url, baseUrl, expected }) => {
    test(name, () => {
      if (baseUrl) {
        process.env.BASE_URL = baseUrl
      }
      expect(isInternal(url)).toBe(expected)
    })
  })
})
