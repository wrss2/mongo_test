var express = require('express'),
  app = express(),
  port = process.env.PORT || 6000,
  mongoose = require('mongoose'),
  Task = require('./api/models/ListModel'),
  bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/db');
var db = mongoose.connection;


db.on('connected', function () {  
  console.log('Mongoose default connection open to ' + 'mongodb://localhost:27017/db'); 
}); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/ListRoutes');
routes(app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);
