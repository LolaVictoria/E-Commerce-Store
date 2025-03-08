describe('Home Page Test', () => {
    it('should load the homepage', () => {
      cy.visit('/'); // Replace with your app's URL
      cy.contains('Alaba Market').should('be.visible'); // Replace with content on your page
    });
  });
  