Given(/^I am searching for movies$/) do
  visit("#{HOST}/")
end

Given(/^I am viewing a movie list$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Given(/^I have saved movies$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Given(/^I am viewing a list$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

When(/^I make a movie a favorite$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

When(/^I search for a movie$/) do
  fill_in 'search', with: 'star wars'
  click_button 'Search!'
end

When(/^I click on a movie$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

When(/^I click on show favorites$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^I should see a list of movies$/) do
  expect(page).to have_selector('div[data-search-result]', 10)
end

Then(/^I should see more detailed information about that movie$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^I see a list of favorite movies$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^It is saved for future use$/) do
  pending # Write code here that turns the phrase above into concrete actions
end
