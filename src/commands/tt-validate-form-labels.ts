export const ttValidateFormLabels = (): void => {
  cy.log('ttValidateFormLabels - NCA TESTIFY')
  cy.get('input, textarea, select').then(($elements) => {
    if ($elements.length === 0) {
      cy.log('No form elements found')
      return
    }

    cy.log(`Found ${$elements.length} form elements`)

    const errors: string[] = []

    $elements.each((index, element) => {
      const el = element as
        | HTMLInputElement
        | HTMLTextAreaElement
        | HTMLSelectElement
      const tagName = el.tagName.toLowerCase()
      const type = el.getAttribute('type') || 'text'
      const name = el.getAttribute('name') || ''
      const id = el.getAttribute('id') || ''

      if (
        type === 'hidden' ||
        type === 'submit' ||
        type === 'button' ||
        type === 'reset' ||
        type === 'image'
      ) {
        return
      }

      const hasAriaLabel = el.hasAttribute('aria-label')
      const hasAriaLabelledby = el.hasAttribute('aria-labelledby')
      const hasTitle = el.hasAttribute('title')

      let hasLabel = false
      if (id) {
        const label = el.ownerDocument.querySelector(`label[for="${id}"]`)
        hasLabel = label !== null
      }

      const isWrappedInLabel = el.closest('label') !== null

      const hasAnyLabel =
        hasLabel ||
        isWrappedInLabel ||
        hasAriaLabel ||
        hasAriaLabelledby ||
        hasTitle

      if (!hasAnyLabel) {
        errors.push(
          `<${tagName}${id ? ` id="${id}"` : ''}${name ? ` name="${name}"` : ''} type="${type}"> has no associated label (element ${index + 1})`
        )
      }
    })

    if (errors.length > 0) {
      throw new Error(
        `Form label validation failed (${errors.length} issues):\n${errors.join('\n')}`
      )
    } else {
      cy.log(`All ${$elements.length} form elements have associated labels`)
    }
  })
}
