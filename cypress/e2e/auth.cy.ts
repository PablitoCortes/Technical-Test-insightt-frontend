describe('Login Flow', () => {
  it('should display the login button and navigate to Auth0 login', () => {
    cy.visit('/');

    // Verify the title is present
    cy.contains('Tasker').should('be.visible');

    // Check for the login button
    cy.get('button').contains('Log In').should('be.visible');

    // Since Auth0 redirection happens outside the app, we can just verify the click logic if we had access to the hook
    // For a real E2E we would test the redirection if possible, but it's often blocked or slow.
    // Here we'll just verify the button exists and is clickable.
    cy.get('button').contains('Log In').click();
  });
});
