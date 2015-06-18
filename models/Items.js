'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemsSchema = mongoose.Schema({
  authorID: {type: String, required: true},
  itemType: String,
  itemName: String,
  imageURL: String,
  caption: String,
  exp: Date,
  qty: Number,
  qtyType: String,
  cost: Number,
  storageType: String
});

module.exports = mongoose.model('Items', itemsSchema);
