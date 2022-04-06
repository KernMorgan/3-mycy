/// <reference types="cypress" />
const faker = require("faker");

let username = faker.name.findName()
let email = faker.internet.email()
let password = faker.internet.password()


beforeEach(() => {
    cy.visit("https://preprod.backmarket.fr/register");
    cy.get(`[data-qa="accept-cta"]`).click();
});

it("should validate inscription",() =>{
    cy.get(`[id ="firstName"]`).type(username);
    cy.get(`[id ="lastName"]`).type(username);
    cy.get(`[id ="signup-email"]`).type(email);
    cy.get(`[id ="signup-password"]`).type("Password.123");
    cy.get(`[data-qa = "signup-submit-button"]`).click();
    //cy.contains('Mes commandes').should("to.exist")
    cy.url().should('eq', 'https://preprod.backmarket.fr/dashboard/orders') 
});


it("should show an error for invalid password", () => {
    cy.get(`[id ="firstName"]`).type(username);
    cy.get(`[id ="lastName"]`).type(username);
    cy.get(`[id ="signup-email"]`).type(email);
    cy.get(`[id ="signup-password"]`).type("Notavalidpassword");
    cy.get(`[data-qa = "signup-submit-button"]`).click();
    cy.get(`[id ="signup-password"]`).should('have.css', 'border-color', 'rgb(169, 15, 20)')
});


it("should show an error for invalid email", () => {
    cy.get(`[id ="firstName"]`).type(username);
    cy.get(`[id ="lastName"]`).type(username);
    cy.get(`[id ="signup-email"]`).type("notavalidmail");
    cy.get(`[id ="signup-password"]`).type("Mypassword.123");
    cy.get(`[data-qa = "signup-submit-button"]`).click();
    cy.get(`[id ="signup-email"]`).should('have.css', 'border-color', 'rgb(169, 15, 20)')
});


it("should show an error for empty first name", () => {
    cy.get(`[id ="lastName"]`).type(username);  
    cy.get(`[id ="signup-email"]`).type(email);
    cy.get(`[id ="signup-password"]`).type("Password.123");
    cy.get(`[data-qa = "signup-submit-button"]`).click();
    cy.get(`[id ="firstName"]`).should('have.css', 'border-color', 'rgb(169, 15, 20)')
});

it("should show an error for empty last name", () => {
    cy.get(`[id ="firstName"]`).type(username);
    cy.get(`[id ="signup-email"]`).type(email);
    cy.get(`[id ="signup-password"]`).type("Mypassword.123");
    cy.get(`[data-qa = "signup-submit-button"]`).click();
    cy.get(`[id ="lastName"]`).should('have.css', 'border-color', 'rgb(169, 15, 20)')
});
