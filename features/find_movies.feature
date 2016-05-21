Feature:
  As a user
  In order to get more information about
  I would like to save movies

  Scenario:
    Given I am searching for movies
    When I search for a movie
    Then I should see a list of movies

  Scenario:
    Given I am viewing a movie list
    When I click on a movie
    Then I should see more detailed information about that movie
