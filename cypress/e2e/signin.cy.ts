describe("Login Page", () => {
    it("should display error for invalid credentials", () => {
      cy.visit("/login");
      cy.get("input[name='email']").type("invalid@example.com");
      cy.get("input[name='password']").type("wrongpassword");
      cy.get("button[type='submit']").click();
      cy.contains("Invalid credentials").should("be.visible");
    });
  });
  