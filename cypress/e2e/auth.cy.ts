describe('Login Page', () => {
  it('should render login screen correctly', () => {
    cy.visit('/')

    cy.contains('Tasker').should('be.visible')
    cy.contains('The minimalist workspace for your daily flow.').should('be.visible')

    cy.get('button')
      .contains('Continue with Auth0')
      .should('be.visible')
      .and('not.be.disabled')
  })
})