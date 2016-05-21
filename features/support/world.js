// This is mainly boiler plate code. It uses the Zombie headless browser to run tests
//
// You can pass in a HOST variable to test another instance of the server, like
// socrates.herokuapp.com
//
// port 5000 is used so you can run the cucumber tests without causing difficulties with a
// development server
const Browser = require('zombie');

function World() {
  this.browser = new Browser();

  this.server = process.env.HOST || 'http://localhost:5000';

  this.visit = path => this.browser.visit(this.server + path);
}

module.exports = function world() {
  this.World = World;
};
