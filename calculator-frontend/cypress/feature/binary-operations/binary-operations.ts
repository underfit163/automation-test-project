import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import MainPage from "../../e2e/main-page";
import {ENumberSystem} from "../../../src/app/entities/ENumberSystem";
import {EOperation} from "../../../src/app/entities/EOperation";

const bunaryNumberSystemType = ENumberSystem.BIN;

Given("I visit {string}", (url: string) => {
  MainPage.visitPage(url);
});

When("I input data to form, set add operation and submit", (url: string) => {
  MainPage.performArithmeticOperation(
    bunaryNumberSystemType,
    EOperation.add,
    "1",
    "1"
  );
});

Then("I should get right add result", () => {
  MainPage.getResult("10").should("exist");
});

When(
  "I input data to form, set subtract operation and submit",
  (url: string) => {
    MainPage.performArithmeticOperation(
      bunaryNumberSystemType,
      EOperation.sub,
      "1000011",
      "10001"
    );
  }
);

Then("I should get right subtract result", () => {
  MainPage.getResult("110010").should("exist");
});

When(
  "I input data to form, set multiply operation and submit",
  (url: string) => {
    MainPage.performArithmeticOperation(
      bunaryNumberSystemType,
      EOperation.mul,
      "10001",
      "101"
    );
  }
);

Then("I should get right multiply result", () => {
  MainPage.getResult("1010101").should("exist");
});

When("I input data to form, set divide operation and submit", (url: string) => {
  MainPage.performArithmeticOperation(
    bunaryNumberSystemType,
    EOperation.div,
    "11111",
    "1011"
  );
});

Then("I should get right divide result", () => {
  MainPage.getResult("10").should("exist");
});
