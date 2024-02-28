Feature: result colors

    Scenario: positive
        Given I visit 'http://localhost:4200/'
        When I get result that grater than zero
        Then I should see green result

    Scenario: zero
        Given I visit 'http://localhost:4200/'
        When I get result that equals zero
        Then I should see black result

    Scenario: negative
        Given I visit 'http://localhost:4200/'
        When I get result that less than zero
        Then I should see red result

