describe("Validate Testify Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  
  it('Runs Testify base tests', () => {
    cy.ttRunTestifyBaseTests();
  });
});
