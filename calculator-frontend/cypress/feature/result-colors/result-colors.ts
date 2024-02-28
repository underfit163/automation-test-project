import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import MainPage from "../../e2e/main-page";
import {ENumberSystem} from "../../../src/app/entities/ENumberSystem";
import {EOperation} from "../../../src/app/entities/EOperation";

const decimalNumberSystemType = ENumberSystem.DEC;

Given("I visit {string}", (url: string) => {
  MainPage.visitPage(url);
});

When("I get result that grater than zero", () => {
  MainPage.performArithmeticOperation(
    decimalNumberSystemType,
    EOperation.add,
    "10",
    "5"
  );
});

Then("I should see green result", () => {
  MainPage.getResult("15")
    .invoke("css", "color")
    .should("eq", "rgb(0, 128, 0)");
});

When("I get result that equals zero", (url: string) => {
  MainPage.performArithmeticOperation(
    decimalNumberSystemType,
    EOperation.sub,
    "10",
    "10"
  );
});

Then("I should see black result", () => {
  MainPage.getResult("0").invoke("css", "color").should("eq", "rgb(0, 0, 0)");
});

When("I get result that less than zero", (url: string) => {
  MainPage.performArithmeticOperation(
    decimalNumberSystemType,
    EOperation.sub,
    "10",
    "15"
  );
});

Then("I should see red result", () => {
  MainPage.getResult("-5")
    .invoke("css", "color")
    .should("eq", "rgb(255, 0, 0)");
});
