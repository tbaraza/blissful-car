Feature: search
  In order to book a car
  As a user
  I want to be able to search for a car

  Scenario: search for a car
    Given I am on the home page
    And I have entered the following selections
      | passengers | insurance | fuel |
      | 1          |  good     | yes  |
    When I go to find deals
    Then I should see results
