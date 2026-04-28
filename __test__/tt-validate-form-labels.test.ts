import { describe, test, expect, vi, beforeEach } from 'vitest'

describe('ttValidateFormLabels', () => {
  let cy: any

  beforeEach(() => {
    cy = {
      log: vi.fn(),
      get: vi.fn(() => ({
        then: vi.fn()
      }))
    }
    global.cy = cy
  })

  test('logs command start', async () => {
    const { ttValidateFormLabels } =
      await import('../src/commands/tt-validate-form-labels')
    ttValidateFormLabels()
    expect(cy.log).toHaveBeenCalledWith('ttValidateFormLabels - NCA TESTIFY')
  })

  test('queries form elements', async () => {
    const { ttValidateFormLabels } =
      await import('../src/commands/tt-validate-form-labels')
    ttValidateFormLabels()
    expect(cy.get).toHaveBeenCalledWith('input, textarea, select')
  })
})
