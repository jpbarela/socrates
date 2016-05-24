require 'capybara/cucumber'
require 'capybara/poltergeist'
require 'capybara-screenshot/cucumber'
require 'rspec'

Capybara.default_driver = :poltergeist
Capybara.javascript_driver = :poltergeist

HOST = ENV['HOST'] || 'http://localhost:5000'
