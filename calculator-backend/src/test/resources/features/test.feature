# lenguage: ru  Лаба 3
Feature: Calculations Testing

  Background:
  Given Empty database

  @calculate
  Scenario: Calculate addition with binary numbers
    Given Operation is "add"
    And Number system is "BIN"
    When First number is "1101"
    And Second number is "1010"
    Then Result is "10111"

  @calculate
  Scenario: Calculate addition with decimal numbers
    Given Operation is "div"
    And Number system is "DEC"
    When Numbers are "24" and "12"
    Then Result is "2.0"

  @calculate
  Scenario Outline: Calculate division with decimal numbers
    Given Operation is "div"
    And Number system is "DEC"
    When First number is "<num1>"
    And Second number is "<num2>"
    Then Result is "<result>"
    Examples:
      | num1 | num2 | result|
      | 30   | 3    | 10.0  |
      | 4    | 4    | 1.0   |
      | 180  | 60   | 3.0   |
      | 36   | 6    | 6.0   |

  @count
  Scenario: Find operations between datetime with decimal numbers with div operation
    Given Execute operations
      | num1 | num2 | base | operation |
      | 20   | 10   | DEC  | div       |
      | 30   | 20   | DEC  | mul       |
      | 40   | 30   | DEC  | sub       |
      | 40   | 30   | DEC  | add       |
    And Number system is "DEC"
    And Operation is "div"
    When Start datetime is "20-02-2024 00:00:00"
    And End datetime is "20-03-2024 00:00:00"
    Then The number of operations should be 1