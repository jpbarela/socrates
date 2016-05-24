var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, '/public')));
// Since we're not including any forms we can remove this middleware
//app.use(bodyParser.urlencoded({ extended: false }))
parseJson = bodyParser.json();

// Don't need to include the root path for the static middleware
app.use(express.static(path.join(__dirname, 'public')));

app.get('/favorites', function(req, res) {
  var data = fs.readFileSync('./data.json');
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

app.post('/favorites', parseJson, function (req, res) {
  if (!req.body.Title || !req.body.imdbID) {
    // Add an error status to help distinguish errors
    res.status(422);
    res.send("Error");
    return;
  }

  id = req.body.imdbID;
  var data = JSON.parse(fs.readFileSync('./data.json'));
  // Look and see if the movie is in the system
  movie = data.find(element => id === element.imdbID);
  // If it's not in the system add it
  if (movie === undefined) {
    data.push(req.body);
  }
  fs.writeFile('./data.json', JSON.stringify(data));
  res.setHeader('Content-Type', 'application/json');
  // Since we created a resource set the status to 201 instead of 200
  res.status(201);
  res.send(data);
});

function start(config) {
  app.listen(config.port);
  console.log('Express server listening on port %d in %s mode', config.port, app.settings.env);
}

exports.start = start;
exports.app = app;
