package com.underfit.calculatorbackend.service;

import com.underfit.calculatorbackend.dto.OperationsFilterDto;
import com.underfit.calculatorbackend.entity.Operations;

import java.util.List;

public interface OperationService {
    Operations performOperation(Operations operations);
    List<Operations> getAllOperationsByFilter(OperationsFilterDto operationsFilterDto);
    List<Operations> getAllOperations();
}
