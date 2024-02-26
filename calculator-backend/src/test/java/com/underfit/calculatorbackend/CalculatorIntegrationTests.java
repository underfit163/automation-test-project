package com.underfit.calculatorbackend;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * 2 лаба. Интеграционное тестирование
 */
@SpringBootTest
@AutoConfigureMockMvc
@Testcontainers
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@ActiveProfiles("integration-test")
@Import(ContainersConfig.class)
public class CalculatorIntegrationTests {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @Order(1)
    @DisplayName("Test calculate")
    public void calculateTest() throws Exception {
        String operation = "add";
        String base1 = "DEC";
        String num1 = "195";
        String base2 = "DEC";
        String num2 = "5";
        String result = "200.0";

        mockMvc.perform(get("/calculator/calculate/{operation}/{base1}/{num1}/{base2}/{num2}",
                        operation, base1, num1, base2, num2))
                .andExpect(status().isOk())
                .andExpect(content().string(result))
                .andDo(print());
    }

    @Test
    @Order(2)
    @DisplayName("Test get operations")
    public void getOperationsTest() throws Exception {
        mockMvc.perform(get("/calculator/get-operations"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", hasSize(5)))
                .andDo(print());
    }

    @Test
    @Order(3)
    @DisplayName("Test get operations by filter")
    public void getOperationsByFilterTest() throws Exception {
        String fromDate = LocalDateTime.now().minusDays(3).format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss"));
        String toDate = LocalDateTime.now().plusDays(1).format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss"));
        String base1 = "DEC";
        String base2 = "DEC";
        String operation = "add";

        mockMvc.perform(get("/calculator/get-operations-by-filter/{fromDate}/{toDate}/{base1}/{base2}/{operation}",
                        fromDate, toDate, base1, base2, operation))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", hasSize(2)))
                .andDo(print());
    }
}
