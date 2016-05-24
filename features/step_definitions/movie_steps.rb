require './features/support/favorite_service'
require 'byebug'

Given(/^I am searching for movies$/) do
  visit("#{HOST}/")
end

Given(/^I am viewing a movie list$/) do
  visit("#{HOST}/")
  fill_in 'search', with: 'star wars'
  click_button 'Search!'
end

Given(/^I have saved movies$/) do
  response = FavoriteService.create('Star Wars: Episode IV - A New Hope', 'tt0076759')
  expect(response.status).to be 201
end

Given(/^I am viewing a list$/) do
  visit("#{HOST}/")
  click_link 'favorites'
end

When(/^I click on a movie$/) do
  click_link 'movie-tt0086190'
end

When(/^I make a movie a favorite$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

When(/^I search for a movie$/) do
  fill_in 'search', with: 'star wars'
  click_button 'Search!'
end

When(/^I click on show favorites$/) do
  visit "#{HOST}/"
  click_link 'favorites'
end

Then(/^I should see a list of movies$/) do
  expect(page).to have_selector('div[data-search-result]', count: 10)
end

Then(/^I should see more detailed information about that movie$/) do
  detailed_movie_data = %w(year rating runtime genre cast director writer awards)
  detailed_movie_data.each do |field|
    expect(page).to have_selector("div[data-movie-#{field}]")
  end
end

Then(/^I see a list of favorite movies$/) do
 expect(page).to have_content 'Star Wars: Episode IV - A New Hope'
end

Then(/^It is saved for future use$/) do
  pending # Write code here that turns the phrase above into concrete actions
end
