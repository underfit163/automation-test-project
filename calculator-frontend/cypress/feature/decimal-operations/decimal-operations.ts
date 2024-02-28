import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import MainPage from "../../e2e/main-page";
import {ENumberSystem} from "../../../src/app/entities/ENumberSystem";
import {EOperation} from "../../../src/app/entities/EOperation";

const decimalNumberSystemType = ENumberSystem.DEC;

Given("I visit {string}", (url: string) => {
  MainPage.visitPage(url);
});

When("I input data to form, set add operation and submit", (url: string) => {
  MainPage.performArithmeticOperation(
    decimalNumberSystemType,
    EOperation.add,
    "10",
    "5"
  );
});

Then("I should get right add result", () => {
  MainPage.getResult("15").should("exist");
});

When("I input data to form, set subtract operation and submit",
  (url: string) => {
    MainPage.performArithmeticOperation(
      decimalNumberSystemType,
      EOperation.sub,
      "10",
      "5"
    );
  }
);

Then("I should get right subtract result", () => {
  MainPage.getResult("5").should("exist");
});

When(
  "I input data to form, set multiply operation and submit",
  (url: string) => {
    MainPage.performArithmeticOperation(
      decimalNumberSystemType,
      EOperation.mul,
      "10",
      "5"
    );
  }
);

Then("I should get right multiply result", () => {
  MainPage.getResult("50").should("exist");
});

When("I input data to form, set divide operation and submit", (url: string) => {
  MainPage.performArithmeticOperation(
    decimalNumberSystemType,
    EOperation.div,
    "10",
    "5"
  );
});

Then("I should get right divide result", () => {
  MainPage.getResult("2").should("exist");
});

When("I input data to form", (url: string) => {
  MainPage.input("1234FRG@%^&*&U^YTutyrg4546");
});

Then("I should get only numbers", () => {
  MainPage.getNumberInput("Операнд 1")
    .find("input")
    .invoke("val")
    .should("eq", "12344546");
  MainPage.getNumberInput("Операнд 2")
    .find("input")
    .invoke("val")
    .should("eq", "12344546");
});

When("I try input zero to second input", (url: string) => {
  MainPage.getSelect(".op-select").click();
  cy.get(`mat-option[ng-reflect-value="${EOperation.div}"]`).click()
  MainPage.getNumberInput("Операнд 2").type("0");

});

Then("I should not be able to input zero", () => {
  MainPage.getNumberInput("Операнд 2")
    .find("input")
    .invoke("val")
    .should("eq", "");
  MainPage.getSubmitButton().should("be.disabled");
});
