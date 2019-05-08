describe('Home Page', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.contains('h1', 'Welcome to Cyber Sec Tools');
  });
});
