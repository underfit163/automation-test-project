package com.underfit.calculatorbackend.calculator;

/**
 * Реализация калькулятора
 */
public abstract class BaseCalculator implements Calculator {

    @Override
    public String calculate(String operation, String base1, String num1, String base2, String num2) {
        base1 = convertNumberSystemToDecimal(base1);
        base2 = convertNumberSystemToDecimal(base2);
        double result = simpleCalculation(base1, num1, base2, num2, operation);//вычисляем значение в decimal
        return convertResultToBase(result);//конвертим результат в нужную систему счисления
    }

    private String convertNumberSystemToDecimal(String base) {
        switch (NumberSystems.valueOf(base)) {
            case BIN ->  base = "2";
            case OCT -> base = "8";
            case DEC -> base = "10";
            case HEX -> base = "16";
        }
        return base;
    }

    private double simpleCalculation(String base1, String num1, String base2, String num2, String operation) {
        double result;

        int numToDecimal1 = Integer.parseInt(num1, Integer.parseInt(base1));
        int numToDecimal2 = Integer.parseInt(num2, Integer.parseInt(base2));

        switch (operation) {
            case "add" -> result = numToDecimal1 + numToDecimal2;
            case "sub" -> result = numToDecimal1 - numToDecimal2;
            case "mul" -> result = numToDecimal1 * numToDecimal2;
            case "div" -> result = divisionCheck(numToDecimal1, numToDecimal2);
            default -> throw new IllegalArgumentException("Wrong choice of operation");
        }
        return result;
    }

    private double divisionCheck(int a, int b) {
        if (b == 0) {
            throw new ArithmeticException("Division by zero is not possible.");
        }
        return (double) a / b;
    }

    protected abstract String convertResultToBase(double result);
}
