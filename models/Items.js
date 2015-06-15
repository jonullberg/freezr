'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemsSchema = mongoose.Schema({
  itemID: String,
  itemType: String,
  brand: String,
  exp: String,
  qty: Number,
  cost: Number,
  storageType: String
});

module.exports = mongoose.model('Items', itemsSchema);
