describe('User Table', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000'); // Ensure you're on the correct page
  });

  it('should display a list of registered users', () => {
    // Assuming the form has been used to register users previously
    cy.get('table').within(() => {
      cy.get('tr').should('have.length.greaterThan', 1); // Header row + at least one user row
    });
  });
});
