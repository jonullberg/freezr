'use strict';

var mongoose = require('mongoose');
var express = require('express');
var passport = require('passport');
var app = express();

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  // res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'GET, POST', 'PUT');
  next();
});
app.use(express.static(__dirname + '/build'));

process.env.APP_SECRET = process.env.APP_SECRET || 'changethischangethischangetis!';

var freezerRoutes = express.Router();
var usersRoutes = express.Router();
var recipeRoutes = express.Router();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/freezer_dev');

app.use(passport.initialize());

app.use(express.static(__dirname + '/app'));

require('./lib/passport_strat.js')(passport);

//add routes here
require('./routes/freezer_routes.js')(freezerRoutes);
require('./routes/auth_routes.js')(usersRoutes, passport);
require('./routes/recipe_routes.js')(recipeRoutes);

app.use('/api', freezerRoutes);
app.use('/api', usersRoutes);
app.use('/api', recipeRoutes);

app.listen(process.env.PORT || 3000, function() {
  console.log('server running on PORT ' + (process.env.PORT || 3000));
});//end listen method
