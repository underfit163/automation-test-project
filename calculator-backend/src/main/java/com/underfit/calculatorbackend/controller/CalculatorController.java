package com.underfit.calculatorbackend.controller;

import com.underfit.calculatorbackend.dto.OperationsFilterDto;
import com.underfit.calculatorbackend.entity.Operations;
import com.underfit.calculatorbackend.service.OperationService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(value = "*", maxAge = 3600)
@RestController
@RequestMapping("/calculator")
@RequiredArgsConstructor
public class CalculatorController {
    private final OperationService operationService;

    @GetMapping("/calculate/{operation}/{base1}/{num1}/{base2}/{num2}")
    public ResponseEntity<String> calculate(
            @PathVariable("operation") String operation,
            @PathVariable("base1") String base1,
            @PathVariable("num1") String num1,
            @PathVariable("base2") String base2,
            @PathVariable("num2") String num2) {
        Operations operations = new Operations();
        operations.setOperationType(operation.trim());
        operations.setFirstNumSystem(base1.trim().toUpperCase());
        operations.setFirstNum(num1);
        operations.setSecondNumSystem(base2.trim().toUpperCase());
        operations.setSecondNum(num2);
        return ResponseEntity.ok(operationService.performOperation(operations).getResult());
    }

    @GetMapping("/get-operations-by-filter/{fromDate}/{toDate}/{base1}/{base2}/{operation}")
    public ResponseEntity<List<Operations>> getOperationsByFilter(@PathVariable("fromDate") @DateTimeFormat(pattern = "dd-MM-yyyy HH:mm:ss") LocalDateTime fromDate,
                                                      @PathVariable("toDate") @DateTimeFormat(pattern = "dd-MM-yyyy HH:mm:ss") LocalDateTime toDate,
                                                      @PathVariable("base1") String base1,
                                                      @PathVariable("base2") String base2,
                                                      @PathVariable("operation") String operation) {
        OperationsFilterDto operationsFilterDto = OperationsFilterDto.builder()
                .operationType(operation.trim())
                .firstNumSystem(base1.trim().toUpperCase())
                .secondNumSystem(base2.trim().toUpperCase())
                .fromDateTime(fromDate)
                .toDateTime(toDate).build();
        return ResponseEntity.ok(operationService.getAllOperationsByFilter(operationsFilterDto));
    }

    @GetMapping("/get-operations")
    public ResponseEntity<List<Operations>> getOperations() {
        return ResponseEntity.ok(operationService.getAllOperations());
    }
}