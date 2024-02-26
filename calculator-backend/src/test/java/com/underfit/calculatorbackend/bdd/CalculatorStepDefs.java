package com.underfit.calculatorbackend.bdd;

import com.underfit.calculatorbackend.entity.Operations;
import com.underfit.calculatorbackend.repository.OperationRepository;
import io.cucumber.java.ParameterType;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * 3 лаба. Определяем шаги тестирования для сценария (test.feature)
 */
public class CalculatorStepDefs extends SpringIntegrationTests {
    @Autowired
    OperationRepository operationRepository;

    private String operation;
    private String base;
    private String num1;
    private String num2;
    private String startDate;
    private String endDate;

    @Given("Empty database")
    public void prepareDatabase() {
        operationRepository.deleteAll();
    }

    @ParameterType("(?:.+;)+.+")
    public List<String> stringList(final String raw) {
        final String[] values = raw.split(";");
        return Arrays.asList(values);
    }

    @Given("Operation is {string}")
    public void operationIs(String operation) {
        this.operation = operation;
    }

    @Given("Number system is {string}")
    public void baseIs(String base) {
        this.base = base;
    }

    @When("First number is {string}")
    public void num1Is(String num1) {
        this.num1 = num1;
    }

    @And("Second number is {string}")
    public void num2Is(String num2) {
        this.num2 = num2;
    }

    @When("Numbers are {string} and {string}")
    public void numbersAreAnd(String num1, String num2) {
        this.num1 = num1;
        this.num2 = num2;
    }

    @Then("Result is {string}")
    public void resultIs(String expectedResult) {
        ResponseEntity<?> result = calculateTest(operation, base, num1, base, num2);
        assertThat(result.getBody()).isEqualTo(expectedResult);
    }

    @Given("Execute operations")
    public void executeOperations(List<Map<String, String>> operations) {
        for (Map<String, String> operationData : operations) {
            String num1 = operationData.get("num1");
            String num2 = operationData.get("num2");
            String base = operationData.get("base");
            String operation = operationData.get("operation");
            ResponseEntity<String> responseEntity = calculateTest(operation, base, num1, base, num2);
            assertEquals(responseEntity.getBody(),
                    operationRepository
                            .findAll(Sort.by("id").descending())
                            .stream()
                            .map(Operations::getResult)
                            .findFirst().orElse(""));
            assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        }
    }

    @When("Start datetime is {string}")
    public void startDatetimeIs(String startDate) {
        this.startDate = startDate;
    }

    @And("End datetime is {string}")
    public void endDatetimeIs(String endDate) {
        this.endDate = endDate;
    }

    @Then("The number of operations should be {int}")
    public void theNumberOfOperationsShouldBe(int expectedResult) {
        List<Operations> operations = Arrays.asList(Objects.requireNonNull(getOperationsByFilterTest(
                startDate, endDate, base, base, operation).getBody()));
        assertThat(operations.size()).isEqualTo(expectedResult);
    }
}
