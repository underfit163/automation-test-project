package com.underfit.calculatorbackend.calculator;

/**
 * Интерфейс калькулятора для выполнения вычислений
 */
public interface Calculator {
    /**
     * Метод выполняет вычисления и выдает результат
     * @param operation Задает операцию
     * @param base1 Задает систему счисления для первого операнда
     * @param num1 Задает первый операнд
     * @param base2 Задает систему счисления для второго операнда
     * @param num2 Задает второй операнд
     * @return Возвращает результат вычисления
     */
    String calculate(String operation, String base1, String num1, String base2, String num2);
}
