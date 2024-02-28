import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import MainPage from "../../e2e/main-page";
import {ENumberSystem} from "../../../src/app/entities/ENumberSystem";
import {EOperation} from "../../../src/app/entities/EOperation";

const octalNumberSystemType = ENumberSystem.OCT;

Given("I visit {string}", (url: string) => {
  MainPage.visitPage(url);
});

When("I input data to form, set add operation and submit", (url: string) => {
  MainPage.performArithmeticOperation(
    octalNumberSystemType,
    EOperation.add,
    "5",
    "5"
  );
});

Then("I should get right add result", () => {
  MainPage.getResult("12").should("exist");
});

When(
  "I input data to form, set subtract operation and submit",
  (url: string) => {
    MainPage.performArithmeticOperation(
      octalNumberSystemType,
      EOperation.sub,
      "10",
      "6"
    );
  }
);

Then("I should get right subtract result", () => {
  MainPage.getResult("2").should("exist");
});

When(
  "I input data to form, set multiply operation and submit",
  (url: string) => {
    MainPage.performArithmeticOperation(
      octalNumberSystemType,
      EOperation.mul,
      "17",
      "4"
    );
  }
);

Then("I should get right multiply result", () => {
  MainPage.getResult("74").should("exist");
});

When("I input data to form, set divide operation and submit", (url: string) => {
  MainPage.performArithmeticOperation(
    octalNumberSystemType,
    EOperation.div,
    "10",
    "4"
  );
});

Then("I should get right divide result", () => {
  MainPage.getResult("2").should("exist");
});
