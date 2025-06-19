import { describe, test, expect, beforeEach, afterEach } from 'vitest'
import { isInternal } from '../src/utils/isInternal'

describe('isInternal', () => {
  test('absolute paths are internal', () => {
    expect(isInternal('/page')).toBe(true)
  })

  test('relative paths are internal', () => {
    expect(isInternal('page')).toBe(true)
  })

  test('URLs starting with baseUrl are internal', () => {
    process.env.BASE_URL = 'https://example.com'
    expect(isInternal('https://example.com/page')).toBe(true)
  })

  test('URLs not starting with baseUrl are external', () => {
    process.env.BASE_URL = 'https://example.com'
    expect(isInternal('https://other.com/page')).toBe(false)
  })

  test('staging vs production - staging baseUrl excludes production URLs', () => {
    process.env.BASE_URL = 'https://testingcrud.testify.projects.nevercodealone.de/'
    expect(isInternal('https://nevercodealone.de/page')).toBe(false)
  })

  test('staging vs production - production baseUrl excludes staging URLs', () => {
    process.env.BASE_URL = 'https://nevercodealone.de/'
    expect(isInternal('https://testingcrud.testify.projects.nevercodealone.de/page')).toBe(false)
  })
})
