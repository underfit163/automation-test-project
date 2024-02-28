Feature: decimal operations

    Scenario: Verify Add
        Given I visit 'http://localhost:4200/'
        When I input data to form, set add operation and submit
        Then I should get right add result

    Scenario: Verify Subtract
        Given I visit 'http://localhost:4200/'
        When I input data to form, set subtract operation and submit
        Then I should get right subtract result

    Scenario: Verify Multiply
        Given I visit 'http://localhost:4200/'
        When I input data to form, set multiply operation and submit
        Then I should get right multiply result

    Scenario: Verify Divide
        Given I visit 'http://localhost:4200/'
        When I input data to form, set divide operation and submit
        Then I should get right divide result

    Scenario: Verify input
        Given I visit 'http://localhost:4200/'
        When I input data to form
        Then I should get only numbers

    Scenario: Divide case with zero
        Given I visit 'http://localhost:4200/'
        When I try input zero to second input
        Then I should not be able to input zero