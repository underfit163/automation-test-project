import MainPage from "../../e2e/main-page";

import {When, Then} from "@badeball/cypress-cucumber-preprocessor";

When("I visit {string}", (url: string) => {
  MainPage.visitPage(url);
});

Then("I should see first input fields", () => {
  MainPage.getNumberInput("Операнд 1").should("exist");
});

Then("I should see second input fields", () => {
  MainPage.getNumberInput("Операнд 2").should("exist");
});

Then("I should see a select number system dropdown", () => {
  MainPage.getSelect(".base-select").should("exist");
});

Then("I should see a select operation dropdown", () => {
  MainPage.getSelect(".op-select").should("exist");
});

Then("I should see a submit button", () => {
  MainPage.getSubmitButton().should("exist");
});
