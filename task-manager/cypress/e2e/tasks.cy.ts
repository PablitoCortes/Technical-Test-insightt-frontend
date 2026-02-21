describe('Task Management', () => {
  beforeEach(() => {
    // In a real scenario, we would use a custom command to login or mock the Auth0 state
    // For this test, we assume the user is "logged in" by mocking the auth provider if we were using mocks
    // Since this is true E2E, we visit the dashboard. 
    // Usually, we'd have a way to bypass login in CI/CD.
    cy.visit('/dashboard');
  });

  it('should display the workspace and categories', () => {
    cy.contains('Workspace').should('be.visible');
    cy.contains('Pending').should('be.visible');
    cy.contains('In Progress').should('be.visible');
    cy.contains('Completed').should('be.visible');
    cy.contains('Archived').should('be.visible');
  });

  it('should allow creating a new task', () => {
    const taskTitle = `Auto Task ${Date.now()}`;

    // Click New Task button
    cy.contains('button', 'New Task').click();

    // Fill the modal
    cy.get('input[label="Title"]').type(taskTitle);
    cy.get('textarea[label="Description"]').type('This is an automated test task');

    // Save
    cy.get('button').contains('Save').click();

    // Verify it appears in Pending (assuming new tasks are pending)
    cy.contains(taskTitle).should('be.visible');
  });

  it('should move a task from Pending to In Progress', () => {
    // This assumes there's at least one task in Pending
    cy.get('div').contains('Pending').parent().find('button').first().click(); // Open Menu
    cy.contains('Move to IN PROGRESS').click();
    cy.contains('Confirmar Movimiento').should('be.visible');
    cy.get('button').contains('Confirm').click();

    // Verify it moved
    cy.get('div').contains('In Progress').parent().should('contain', 'Task moved to IN PROGRESS');
  });
});
