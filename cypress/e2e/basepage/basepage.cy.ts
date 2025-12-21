import { BasePage } from '../../../src/pages/BasePage'

class TestPage extends BasePage {
  get heading() {
    return this.el('h1') // Logs: heading
  }

  get imprintLink() {
    return this.el('a[href*="impressum"]') // Logs: imprintLink
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

  it('logs getter name for imprintLink', () => {
    page.imprintLink.should('exist')
  })
})
