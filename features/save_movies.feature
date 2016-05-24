Feature:
  As a user
  In order to easily view the movies I like best
  I would like to save movies

Scenario:
  Given I have saved movies
  When I click on show favorites
  Then I see a list of favorite movies

Scenario:
  Given I have saved movies
  And I am viewing a list
  When I make a movie a favorite
  Then It is saved for future use
