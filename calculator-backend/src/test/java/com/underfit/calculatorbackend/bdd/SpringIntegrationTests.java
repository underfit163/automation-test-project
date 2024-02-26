package com.underfit.calculatorbackend.bdd;

import com.underfit.calculatorbackend.ContainersConfig;
import com.underfit.calculatorbackend.entity.Operations;
import io.cucumber.spring.CucumberContextConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.context.annotation.Import;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

/**
 * Здесь конфигурация и Rest вызовы
 */
@CucumberContextConfiguration
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("integration-test")
@Import(ContainersConfig.class)
public class SpringIntegrationTests {

    @Autowired
    private TestRestTemplate testRestTemplate;
    @LocalServerPort
    private int localServerPort;
    public ResponseEntity<String> calculateTest(String operation, String base1, String num1, String base2, String num2) {
        return testRestTemplate.getForEntity(
                "http://localhost:" + localServerPort + "/calculator/calculate/{operation}/{base1}/{num1}/{base2}/{num2}",
                String.class,
                operation,
                base1,
                num1,
                base2,
                num2
        );
    }

    public ResponseEntity<Operations[]> getOperationsByFilterTest(String fromDate, String toDate, String base1, String base2, String operation) {
        return testRestTemplate.getForEntity(
                "http://localhost:" + localServerPort + "/calculator/get-operations-by-filter/{fromDate}/{toDate}/{base1}/{base2}/{operation}",
                Operations[].class,
                fromDate,
                toDate,
                base1,
                base2,
                operation
        );
    }
}
