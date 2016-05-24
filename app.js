var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }))
parseJson = bodyParser.json();

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/favorites', function(req, res) {
  var data = fs.readFileSync('./data.json');
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

app.post('/favorites', parseJson, function (req, res) {
  if (!req.body.Title || !req.body.imdbID) {
    res.status(422);
    res.send("Error");
    return;
  }

  id = req.body.imdbID;
  var data = JSON.parse(fs.readFileSync('./data.json'));
  movie = data.find(element => id === element.imdbID);
  if (movie === undefined) {
    data.push(req.body);
  }
  fs.writeFile('./data.json', JSON.stringify(data));
  res.setHeader('Content-Type', 'application/json');
  res.status(201);
  res.send(data);
});

function start(config) {
  app.listen(config.port);
  console.log('Express server listening on port %d in %s mode', config.port, app.settings.env);
}

exports.start = start;
exports.app = app;
