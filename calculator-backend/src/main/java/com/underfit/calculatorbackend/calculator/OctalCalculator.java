package com.underfit.calculatorbackend.calculator;

public class OctalCalculator extends BaseCalculator{

    @Override
    protected String convertResultToBase(double result){
        return Integer.toOctalString((int) result);
    }
}

