import { describe, test, expect, vi, beforeEach } from 'vitest'

describe('ttValidateLanguageTag', () => {
  let cy: any

  beforeEach(() => {
    cy = {
      log: vi.fn(),
      ttEl: vi.fn(() => ({
        should: vi.fn(() => ({
          invoke: vi.fn(() => ({
            then: vi.fn((cb: any) => cb('de'))
          }))
        })),
        invoke: vi.fn(() => ({
          then: vi.fn((cb: any) => cb('de'))
        }))
      }))
    }
    global.cy = cy
    global.expect = ((value: any) => ({
      to: {
        contain: vi.fn()
      }
    })) as any
  })

  test('logs command start', async () => {
    const { ttValidateLanguageTag } =
      await import('../src/commands/tt-validate-language-tag')
    ttValidateLanguageTag('de')
    expect(cy.log).toHaveBeenCalledWith('ttValidateLanguageTag - NCA TESTIFY')
  })

  test('calls ttEl with html selector', async () => {
    const { ttValidateLanguageTag } =
      await import('../src/commands/tt-validate-language-tag')
    ttValidateLanguageTag('de')
    expect(cy.ttEl).toHaveBeenCalledWith('html', 'htmlElement')
  })

  test('uses de as default language', async () => {
    const { ttValidateLanguageTag } =
      await import('../src/commands/tt-validate-language-tag')
    ttValidateLanguageTag()
    expect(cy.ttEl).toHaveBeenCalledWith('html', 'htmlElement')
  })
})
