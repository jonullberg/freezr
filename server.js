'use strict';

var express = require('express');
var passport = require('passport');
var sequelize = require('sequelize');
var app = express();

app.use(express.static(__dirname + '/build'));
app.use(express.static(__dirname + '/app'));

var freezerRoutes = express.Router();
var usersRoutes = express.Router();

app.use(passport.initialize());

//add routes here
require('./routes/freezer_routes.js')(freezerRoutes);
require('./routes/auth_routes.js')(usersRoutes, passport);

app.use('/api', freezerRoutes);
app.use('/api', usersRoutes);

app.listen(process.env.PORT || 3000, function() {
  console.log('server running on PORT ' + (process.env.PORT || 3000));
});//end listen method
