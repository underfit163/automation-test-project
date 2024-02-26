package com.underfit.calculatorbackend;

import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import com.opencsv.exceptions.CsvValidationException;
import com.underfit.calculatorbackend.calculator.Calculator;
import com.underfit.calculatorbackend.service.CalculatorFactory;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvFileSource;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

/**
 * 1 Лаба. Модульное тестирование
 */
@SpringBootTest
@Import(ContainersConfig.class)
class CalculatorModuleTests {
    @Autowired
    private CalculatorFactory calculatorFactory;

    /*
         Параметризованный тест для проверки арифметических операций,
         данные загружаются из файла ресурсов /testData.csv
     */
    @ParameterizedTest
    @CsvFileSource(resources = "/testData.csv")
    void calculateTests(String operation, String base1, String num1, String base2, String num2, String expectedResult) {
        Calculator calculator = calculatorFactory.createCalculator(base1);
        Assertions.assertEquals(expectedResult, calculator.calculate(operation, base1, num1, base2, num2));
    }

    /*
     Параметризованный тест для проверки выбрасывания исключения при попытке деления ноль
     */
    @ParameterizedTest
    @CsvSource({"div, DEC, 5, DEC, 0"})
    void testDivisionByZero(String operation, String base1, String num1, String base2, String num2) {
        // Проверка выбрасывания исключения при делении на 0
        Calculator calculator = calculatorFactory.createCalculator(base1);
        Assertions.assertThrows(ArithmeticException.class, () -> calculator.calculate(operation, base1, num1, base2, num2));
    }

    /*
    Динамический тест для проверки арифметических операций,
    данные загружаются из файла ресурсов /dinamicTestData.csv
     */
    @TestFactory
    public Stream<DynamicTest> dynamicTests() {
        List<TestData> testDataList = loadTestDataFromCsv();

        return testDataList.stream().map(testData ->
                DynamicTest.dynamicTest(testData.getName(), () -> {
                    // Инициализация калькулятора с нужной системой счисления
                    Calculator calculator = calculatorFactory.createCalculator(testData.base1);

                    // Получение операндов и ожидаемого результата
                    String num1 = testData.getNum1();
                    String num2 = testData.getNum2();
                    String expectedResult = testData.getExpectedResult();

                    // Выполнение операции и проверка результата
                    String actualResult = calculator.calculate(
                            testData.getOperation(),
                            testData.base1, num1,
                            testData.base2, num2);
                    Assertions.assertEquals(expectedResult, actualResult);
                })
        );
    }

    private List<TestData> loadTestDataFromCsv() {
        List<TestData> testDataList = new ArrayList<>();
        getClass().getResource("").getPath();
        try (InputStream inputStream = getClass().getResourceAsStream("/dinamicTestData.csv");
             InputStreamReader reader = new InputStreamReader(inputStream);
             CSVReader csvReader = new CSVReaderBuilder(reader).build()) {

            String[] line;
            while ((line = csvReader.readNext()) != null) {
                testDataList.add(new TestData(
                        line[0], // name
                        line[1], // operation
                        line[2], // base1
                        line[3], // num1
                        line[4], // base2
                        line[5], // num2
                        line[6]  // expectedResult
                ));
            }
        } catch (IOException | CsvValidationException e) {
            throw new RuntimeException("Failed to load test data from CSV", e);
        }
        return testDataList;
    }

    @Data
    @AllArgsConstructor
    private static class TestData {
        private String name;
        private String operation;
        private String base1;
        private String num1;
        private String base2;
        private String num2;
        private String expectedResult;
    }
}
