require 'capybara/cucumber'
require 'capybara/poltergeist'
require 'capybara-screenshot/cucumber'

Capybara.default_driver = :poltergeist
Capybara.javascript_driver = :poltergeist

HOST = ENV['HOST'] || 'http://localhost:5000'
