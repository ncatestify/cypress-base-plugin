import { isInternal } from '../src/utils/isInternal'
import { expect } from '@jest/globals'

describe('isInternal', () => {
  test('returns true for internal URLs', () => {
    expect(isInternal('/path/to/page')).toBe(true)
  })

  test('returns false for external URLs', () => {
    expect(isInternal('https://www.example.com')).toBe(false)
  })

  test('returns true for wildcard protocol matching baseUrl', () => {
    expect(isInternal('//localhost:3000/path/to/page')).toBe(true)
  })

  test('returns false for wildcard protocol not matching baseUrl', () => {
    expect(isInternal('//www.instagram.com/profile')).toBe(false)
  })
})
