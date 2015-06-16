'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemsSchema = mongoose.Schema({
  itemType: String,
  itemName: String,
  imageURL: String,
  caption: String,
  exp: Date,
  qty: Number,
  qtyType: String,
  cost: Number,
  storageType: String,
  _creator: {type: Number, ref: 'User'}
});

module.exports = mongoose.model('Items', itemsSchema);
