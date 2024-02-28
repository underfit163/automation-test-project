import {Given, Then, When} from "@badeball/cypress-cucumber-preprocessor";
import MainPage from "../../e2e/main-page";
import {ENumberSystem} from "../../../src/app/entities/ENumberSystem";
import {EOperation} from "../../../src/app/entities/EOperation";

const hexadecimalNumberSystemType = ENumberSystem.HEX;

Given("I visit {string}", (url: string) => {
  MainPage.visitPage(url);
});

When("I input data to form, set add operation and submit", (url: string) => {
  MainPage.performArithmeticOperation(
    hexadecimalNumberSystemType,
    EOperation.add,
    "c",
    "1"
  );
});

Then("I should get right add result", () => {
  MainPage.getResult("d").should("exist");
});

When(
  "I input data to form, set subtract operation and submit",
  (url: string) => {
    MainPage.performArithmeticOperation(
      hexadecimalNumberSystemType,
      EOperation.sub,
      "32",
      "6"
    );
  }
);

Then("I should get right subtract result", () => {
  MainPage.getResult("2c").should("exist");
});

When(
  "I input data to form, set multiply operation and submit",
  (url: string) => {
    MainPage.performArithmeticOperation(
      hexadecimalNumberSystemType,
      EOperation.mul,
      "7",
      "6"
    );
  }
);

Then("I should get right multiply result", () => {
  MainPage.getResult("2a").should("exist");
});

When("I input data to form, set divide operation and submit", (url: string) => {
  MainPage.performArithmeticOperation(
    hexadecimalNumberSystemType,
    EOperation.div,
    "f",
    "f"
  );
});

Then("I should get right divide result", () => {
  MainPage.getResult("1").should("exist");
});

When("I input data to form with specific lettrs", (url: string) => {
  MainPage.performArithmeticOperation(
    hexadecimalNumberSystemType,
    EOperation.div,
    "aqwerb",
    "aqwerb"
  );
});

Then("I should get see aeb", () => {
  MainPage.getNumberInput("Операнд 1")
    .find("input")
    .invoke("val")
    .should("eq", "aeb");
  MainPage.getNumberInput("Операнд 2")
    .find("input")
    .invoke("val")
    .should("eq", "aeb");
});
