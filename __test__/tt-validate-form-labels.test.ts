import { describe, test, expect, vi, beforeEach } from 'vitest'

describe('ttValidateFormLabels', () => {
  let cy: any
  let bodyCallback: (body: unknown) => void

  const createElement = (overrides: Record<string, unknown> = {}) => ({
    tagName: 'INPUT',
    getAttribute: vi.fn((attr: string) =>
      attr === 'type' ? (overrides.type ?? 'text') : null
    ),
    hasAttribute: vi.fn(
      (attr: string) => (overrides.attributes ?? []).includes(attr)
    ),
    ownerDocument: { querySelector: vi.fn(() => overrides.label ?? null) },
    closest: vi.fn(() => null)
  })

  const createCollection = (elements: unknown[]) => ({
    length: elements.length,
    each: vi.fn((cb: (index: number, element: unknown) => void) => {
      elements.forEach((element, index) => cb(index, element))
    })
  })

  beforeEach(() => {
    bodyCallback = () => {}
    cy = {
      log: vi.fn(),
      get: vi.fn(() => ({
        then: vi.fn((cb: (body: unknown) => void) => {
          bodyCallback = cb
        })
      }))
    }
    global.cy = cy
  })

  test('logs command start', async () => {
    const { ttValidateFormLabels } = await import(
      '../src/commands/tt-validate-form-labels'
    )
    ttValidateFormLabels()
    expect(cy.log).toHaveBeenCalledWith('ttValidateFormLabels - NCA TESTIFY')
  })

  test('queries the body for form elements', async () => {
    const { ttValidateFormLabels } = await import(
      '../src/commands/tt-validate-form-labels'
    )
    ttValidateFormLabels()
    expect(cy.get).toHaveBeenCalledWith('body')

    const find = vi.fn(() => createCollection([]))
    bodyCallback({ find })
    expect(find).toHaveBeenCalledWith('input, textarea, select')
  })

  test('logs when no form elements exist', async () => {
    const { ttValidateFormLabels } = await import(
      '../src/commands/tt-validate-form-labels'
    )
    ttValidateFormLabels()

    bodyCallback({ find: vi.fn(() => createCollection([])) })
    expect(cy.log).toHaveBeenCalledWith('No form elements found')
  })

  test('throws when an input has no associated label', async () => {
    const { ttValidateFormLabels } = await import(
      '../src/commands/tt-validate-form-labels'
    )
    ttValidateFormLabels()

    const element = createElement()
    const collection = createCollection([element])

    expect(() => bodyCallback({ find: vi.fn(() => collection) })).toThrow(
      'Form label validation failed (1 issues)'
    )
  })

  test('passes when inputs have aria-labels', async () => {
    const { ttValidateFormLabels } = await import(
      '../src/commands/tt-validate-form-labels'
    )
    ttValidateFormLabels()

    const element = createElement({ attributes: ['aria-label'] })
    const collection = createCollection([element])

    expect(() => bodyCallback({ find: vi.fn(() => collection) })).not.to.throw()
    expect(cy.log).toHaveBeenCalledWith(
      'All 1 form elements have associated labels'
    )
  })
})
