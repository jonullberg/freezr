'use strict';

var express = require('express');
var passport = require('passport');
var app = express();

var freezerRoutes = express.Router();
var usersRoutes = express.Router();

app.use(express.static(__dirname + '/build'));
app.use(express.static(__dirname + '/app'));

//add routes here
require('./routes/freezer_routes.js')(freezerRoutes);
require('./routes/auth_routes.js')(usersRoutes);

app.use('/api', freezerRoutes);
app.use('/api', usersRoutes);

app.listen(process.env.PORT || 3000, function() {
  console.log('server running on PORT ' + (process.env.PORT || 3000));
});//end listen method
