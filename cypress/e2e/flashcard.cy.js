describe("Test Flaschcard Application for basic Functionality", () => {
  beforeEach(() => {
    cy.visit("http://localhost:9000");
  });

  it("Create Flashcard", () => {
    cy.get("button[name=addCard]").contains("Add Flashcard").click();
    cy.get("textarea[name=question]").type("What is the capital of Germany?");
    cy.get("textarea[name=answer]").type("Berlin");
    cy.get("button[name=cardSave]").click();
    cy.get("div").contains("What is the capital of Germany?");
  });

  it("Edit Flashcard", () => {
    cy.get("button[name=editCard]").first().click();
    cy.get("textarea[name=question]").clear().type("What is the capital of France?");
    cy.get("textarea[name=answer]").clear().type("Paris");
    cy.get("button[name=cardSave]").click();
    cy.get("div").contains("What is the capital of France?");
  });

  it("Delete Flashcard", () => {
    cy.get("button[name=deleteCard]").first().click();
    cy.get("div").contains("What is currying?").should("not.exist");
  });

  it("Show Answer", () => {
    cy.get("a[name=showAnswer]").first().click();
    cy.get("div").contains("What is currying?");
    cy.get("span").contains("currying is the technique");
  });
});
