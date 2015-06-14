'use strict';

var express = require('express');
var app = express();
var freezerRoutes = express.Router();

app.use(express.static(__dirname + '/build'));
app.use(express.static(__dirname + '/app'));

//add routes here
//require('./routes/freezer_routes.js')(freezerRoutes);

app.use('/api', freezerRouter);

app.listen(process.env.PORT || 3000, function() {
  console.log('server running on PORT ' + (process.env.PORT || 3000));
});//end listen method
