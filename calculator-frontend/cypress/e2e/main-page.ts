class MainPage {
  static visitPage(url: string) {
    cy.visit(url);
  }

  static getNumberInput(label: string) {
    return cy.get(`app-number-input[label="${label}"]`);
  }

  static getSelect(select:string) {
    return cy.get(`${select}`);
  }

  static getSubmitButton() {
    return cy.contains("button", "Вычислить");
  }

  static performArithmeticOperation(
    numberSystem: string,
    operation: string,
    firstNumber: string,
    secondNumber: string
  ) {
    MainPage.getSelect(".base-select").click();
    cy.get(`mat-option[ng-reflect-value="${numberSystem}"]`).click();
    MainPage.getSelect(".op-select").click();
    cy.get(`mat-option[ng-reflect-value="${operation}"]`).click();
    MainPage.getNumberInput("Операнд 1").type(firstNumber);
    MainPage.getNumberInput("Операнд 2").type(secondNumber);
    MainPage.getSubmitButton().click();
  }

  static getResult(expectedResult: string|number) {
    return cy.get("mat-card-content").contains(expectedResult);
  }

  static input(string: string): void {
    MainPage.getNumberInput("Операнд 1").type(string);
    MainPage.getNumberInput("Операнд 2").type(string);
  }
}

export default MainPage;
