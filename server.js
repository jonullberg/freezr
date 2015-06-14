'use strict';

var express = require('express');
var app = express();
var freezerRouter = express.Router();

//add routes here

app.use('/api', freezerRouter);
app.listen(3000, function() {
  console.log('server running on port 3000');
});
