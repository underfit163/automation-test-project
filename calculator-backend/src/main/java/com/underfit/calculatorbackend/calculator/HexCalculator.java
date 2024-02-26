package com.underfit.calculatorbackend.calculator;

public class HexCalculator extends BaseCalculator{

    @Override
    protected String convertResultToBase(double result){
        return Integer.toHexString((int) result);
    }
}
