package com.underfit.calculatorbackend.service;

import com.underfit.calculatorbackend.calculator.*;
import com.underfit.calculatorbackend.dto.OperationsFilterDto;
import com.underfit.calculatorbackend.repository.OperationRepository;
import com.underfit.calculatorbackend.entity.Operations;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
@Slf4j
@Service
@RequiredArgsConstructor
public class OperationServiceImpl implements OperationService {
    private final OperationRepository operationRepository;
    private final CalculatorFactory calculatorFactory;

    /**
     * Получение результата сложения/вычитания/умножения/деления двух чисел. Числа
     * могут быть в разных системах счисления. Все входные данные сохраняются в БД, в
     * том числе время и дата выполнения запроса.
     * @param operations информация о необходимом вычислении
     * @return возвращаем запись о вычислении
     */
    @Override
    public Operations performOperation(Operations operations) {
        log.info("Operation: {}", operations);
        // Логика выполнения вычислений
        Calculator calculator = calculatorFactory.createCalculator(operations.getFirstNumSystem());
        String result = calculator.calculate(operations.getOperationType(),
                operations.getFirstNumSystem(), operations.getFirstNum(),
                operations.getSecondNumSystem(), operations.getSecondNum());
        operations.setResult(result);
        operations.setOperationsDateTime(LocalDateTime.now());
        // Сохранение в БД
        return operationRepository.save(operations);
    }

    /**
     * Получение данных о всех вычислениях за определенный момент времени, с учетом
     * операции и используемой системы счисления для каждого из чисел.
     * @param operationsFilterDto фильтр поиска вычислений
     * @return список отфильтрованных вычислений
     */
    @Override
    public List<Operations> getAllOperationsByFilter(OperationsFilterDto operationsFilterDto) {
        log.info("OperationFilter: {}", operationsFilterDto);
        // Логика получения вычислений
        if (operationsFilterDto.getFromDateTime() == null) {
            LocalDateTime localDateTime = LocalDateTime.now();
            operationsFilterDto.setFromDateTime(localDateTime);
        }
        if (operationsFilterDto.getToDateTime() == null) {
            LocalDateTime localDateTime = LocalDateTime.now();
            operationsFilterDto.setToDateTime(localDateTime);
        }
        return operationRepository.findAllByOperationsDateTimeBetweenAndOperationTypeAndFirstNumSystemAndSecondNumSystem(
                operationsFilterDto.getFromDateTime(),
                operationsFilterDto.getToDateTime(),
                operationsFilterDto.getOperationType(),
                operationsFilterDto.getFirstNumSystem(),
                operationsFilterDto.getSecondNumSystem()
        );
    }
    @Override
    public List<Operations> getAllOperations() {
        return operationRepository.findAll();
    }
}
