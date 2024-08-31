describe('User Registration Form', () => {
    beforeEach(() => {
        cy.visit('https://back-projet-connect-perard-alison-dkl24.vercel.app/api/users'); // Replace with the correct URL if necessary
    });

    it('should successfully submit a valid registration form', () => {
        // Fill in the form
        cy.get('input[name="firstName"]').type('John');
        cy.get('input[name="lastName"]').type('Doe');
        cy.get('input[name="email"]').type('john.doe@example.com');
        cy.get('input[name="birthDate"]').type('1990-01-01');
        cy.get('input[name="city"]').type('Paris');
        cy.get('input[name="postalCode"]').type('75000');

        // Submit the form
        cy.get('button').contains('Save').click();

        // Assert the form is reset and success message is displayed
        cy.get('input[name="firstName"]').should('have.value', '');
        cy.get('.success-message').should('contain', 'Form submitted successfully!');

        // Wait for the success message to disappear
        cy.wait(5000);
        cy.get('.success-message').should('not.exist');
    });

    it('should display validation errors for invalid inputs', () => {
        // Submit the form without filling it in
        cy.get('button').contains('Save').click();

        // Assert validation messages
        cy.get('span').contains('Invalid name').should('be.visible');
        cy.get('span').contains('Invalid email').should('be.visible');
        cy.get('span').contains('You must be over 18').should('be.visible');
        cy.get('span').contains('Invalid postal code').should('be.visible');
    });
});
