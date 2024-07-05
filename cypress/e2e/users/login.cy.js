describe('Login Scenario', () => {
  let username, email, password;

  before(() => {
    username = cy.faker.internet.userName()
    email = cy.faker.internet.email()
    password = cy.faker.internet.password()
  });

  beforeEach(() => {
    // Visit the login page before each test
    cy.visit('/login');
    cy.register(username, email, password)
  });

  it('should display the login form', () => {
    // Check that the login form is visible
    cy.get('form').should('be.visible');
  });

  it('should allow a user to log in', () => {
    // Use the custom login command
    cy.login(email, password);

    // Verify that a specific element on the dashboard is visible
    cy.get('h1').contains("Hi "+username).should('be.visible');
    cy.contains("Logout").should('be.visible');
    cy.contains("Users").should('be.visible');
  });

  it('should display an error message for invalid credentials', () => {
    // Use the custom login command with invalid credentials
    cy.login('invaliduser', 'invalidpassword');

    // Verify that an error message is displayed
    cy.get('.alert-danger').should('be.visible').and('contain', 'status code 401');
  });


  it('should allow a user to log out', () => {

    // Log in first
    cy.login(email, password);

    // Use the custom logout command
    cy.logout();

    // Verify that the user is redirected to the login page
    cy.url().should('include', '/login');
  });
});
