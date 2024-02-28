Feature: controls-existence

    Scenario: Verify the existence of inputs, dropdown, and result button
        When I visit 'http://localhost:4200/'
        Then I should see first input fields
        And I should see second input fields
        And I should see a select number system dropdown
        And I should see a select operation dropdown
        And I should see a submit button
