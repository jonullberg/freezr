'use strict';

var mongoose = require('mongoose');
var express = require('express');
var passport = require('passport');
var app = express();

app.use(express.static(__dirname + '/build'));

process.env.APP_SECRET = process.env.APP_SECRET || 'changethischangethischangetis!';

var freezerRoutes = express.Router();
var usersRoutes = express.Router();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/freezer_dev');

app.use(passport.initialize());

app.use(express.static(__dirname + '/app'));
//heroku change
app.use(express.static(__dirname + '/build'));

require('./lib/passport_strat.js')(passport);

//add routes here
require('./routes/freezer_routes.js')(freezerRoutes);
require('./routes/auth_routes.js')(usersRoutes, passport);

app.use('/api', freezerRoutes);
app.use('/api', usersRoutes);

app.listen(process.env.PORT || 3000, function() {
  console.log('server running on PORT ' + (process.env.PORT || 3000));
});//end listen method
