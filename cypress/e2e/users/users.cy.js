describe('Users Section', () => {
  let username, email, password;

  before(() => {
    username = cy.faker.internet.userName()
    email = cy.faker.internet.email()
    password = cy.faker.internet.password()
  });

  beforeEach(() => {
    // Visit the base URL before each test
    cy.visit('/');
    cy.register(username, email, password)
    cy.login(email, password);
  });

  it('should navigate to the users list', () => {
    // Click on the "Users" link in the navigation
    cy.get('nav').contains('Users').click();
    
    // Verify that the URL includes /users
    cy.url().should('include', '/users');

    // Verify that the users list is displayed
    cy.get('h1').contains('Users').should('be.visible');
  });

  it('should display a list of users', () => {
    // Navigate to the users list
    cy.get('nav').contains('Users').click();

    // Verify that the list contains at least one user
    cy.get('[data-cy="users-table"]').children().should('have.length.greaterThan', 0);
  });

  it('should allow adding a new user', () => {

    var newUsername = cy.faker.internet.userName()
    var newEmail = cy.faker.internet.email()
    var newPassword = cy.faker.internet.password()

    // Navigate to the users list
    cy.get('nav').contains('Users').click();

    // Click the "Add User" button
    cy.get("[data-cy='add-user-btn']").contains('Add User').click();

    // Fill out the form
    cy.get('input[name="name"]').type(newUsername);
    cy.get('input[name="email"]').type(newEmail);
    cy.get('input[name="username"]').type(newUsername);
    cy.get('input[name="password"]').type(newPassword);
    cy.get("[data-cy='save-user-btn']").contains('Save').click();

    // Verify that the new user is added to the list
    cy.get('[data-cy="users-table"]').contains(newEmail).should('be.visible');

  });

  it('should allow editing an existing user', () => {
    // Navigate to the users list
    cy.get('nav').contains('Users').click();

    // Click the "Edit" button for the first user
    // cy.get('[data-cy="users-table"]').children()[1].contains('Edit').click();
    cy.get('[data-cy="users-table"] tbody tr').eq(1).as('secondRow');
    cy.get('@secondRow').contains('Edit').click();

    var newName = 'Updated User'
    // Update the user information
    cy.get('input[name="name"]').clear()
    cy.get('input[name="name"]').type(newName);
    cy.get('button').contains('Save').click();

    // Verify that the user information is updated
    cy.get('[data-cy="users-table"]').contains(newName).should('be.visible');

    // cy.get('@secondRow').within(() => {
    //   cy.get('td').eq(0).should('have.text', newName);
    // });
  });

  it('should allow deleting a user', () => {
    // Navigate to the users list
    cy.get('nav').contains('Users').click();
    var totalRows = 0
    cy.get('[data-cy="users-table"]').find("tr").then((row) => {
      //row.length will give you the row count
      totalRows = row.length
      cy.log("table rows", row.length);
    });
    // Click the "Delete" button for the first user
    cy.get('[data-cy="users-table"] tbody tr').eq(1).as('secondRow');
    cy.get('@secondRow').contains('Delete').click();

    
    // Verify that the user is removed from the list
    cy.get('[data-cy="users-table"]').find("tr").then((row) => {
      //row.length will give you the row count
      expect(totalRows).to.equal(row.length + 1);
    });

  });

  it('should allow a user to log out', () => {

    // Use the custom logout command
    cy.logout();

    // Verify that the user is redirected to the login page
    cy.url().should('include', '/login');
  });
});
