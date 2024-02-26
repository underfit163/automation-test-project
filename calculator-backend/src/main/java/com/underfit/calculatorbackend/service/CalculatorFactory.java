package com.underfit.calculatorbackend.service;

import com.underfit.calculatorbackend.calculator.*;
import org.springframework.stereotype.Service;

@Service
public class CalculatorFactory {
    public Calculator createCalculator(String base) {
        NumberSystems numberSystems = NumberSystems.valueOf(base);
        return switch (numberSystems) {
            case BIN -> new BinaryCalculator();
            case OCT -> new OctalCalculator();
            case DEC -> new DecimalCalculator();
            case HEX -> new HexCalculator();
        };
    }
}
