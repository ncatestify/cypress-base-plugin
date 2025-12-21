import { BasePage } from '../../../src/pages/BasePage'

class TestPage extends BasePage {
  get heading() {
    return this.el('h1')
  }

  get link() {
    return this.elContains('Impressum')
  }

  getExplicitName() {
    return this.el('h1', 'explicitHeading')
  }
}

describe('BasePage', () => {
  const page = new TestPage()

  beforeEach(() => {
    cy.visit('/')
  })

  it('logs getter name for el()', () => {
    page.heading.should('exist')
  })

  it('logs getter name for elContains()', () => {
    page.link.should('exist')
  })

  it('uses explicit name when provided', () => {
    page.getExplicitName().should('exist')
  })
})
