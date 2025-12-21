import { describe, test, expect } from 'vitest'
import { resolveElementName } from '../src/pages/BasePage'

describe('resolveElementName', () => {
  const cases = [
    { explicit: 'myName', caller: 'getter', fallback: '#sel', expected: 'myName' },
    { explicit: undefined, caller: 'getter', fallback: '#sel', expected: 'getter' },
    { explicit: undefined, caller: null, fallback: '#sel', expected: '#sel' },
  ]

  cases.forEach(({ explicit, caller, fallback, expected }) => {
    test(`resolves to "${expected}" when explicit=${explicit}, caller=${caller}`, () => {
      expect(resolveElementName(explicit, caller, fallback)).toBe(expected)
    })
  })
})
