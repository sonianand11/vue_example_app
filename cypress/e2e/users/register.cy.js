describe('Register User', () => {
  let username, email, password;

  before(() => {
    username = cy.faker.internet.userName()
    email = cy.faker.internet.email()
    password = cy.faker.internet.password()
  });

  beforeEach(() => {
    // Visit the base URL before each test
    cy.visit('/');
  });

  it('should allow a user to register', () => {

    // Use the custom register command
    cy.register(username, email, password);
    cy.contains("Registration successful")
  });

  it('should give an error of validation', () => {

    cy.visit('/account/register');
    cy.get('input[name="name"]').type(username);
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button').contains('Register').click();

    cy.contains("Error")
  });

});
