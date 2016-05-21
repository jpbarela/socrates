// This script will start the server if no host is passed in
const app = require('../../server.js');

function startServer() {
  this.registerHandler('BeforeFeatures', (event, callback) => {
    const server = process.env.HOST;
  if (server === undefined) {
    app.start({ port: 5000 });
  }
  callback();
});
}

module.exports = startServer;