package com.underfit.calculatorbackend.calculator;

public class BinaryCalculator extends BaseCalculator {
    @Override
    protected String convertResultToBase(double result){
        return Integer.toBinaryString((int) result);
    }
}
