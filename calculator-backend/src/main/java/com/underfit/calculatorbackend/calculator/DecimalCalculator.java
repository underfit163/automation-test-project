package com.underfit.calculatorbackend.calculator;

public class DecimalCalculator extends BaseCalculator{

    @Override
    protected String convertResultToBase(double result){
        return Double.toString(result);
    }
}

