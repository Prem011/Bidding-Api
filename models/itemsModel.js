const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const plm = require("passport-local-mongoose");

const itemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  starting_price: {
    type: mongoose.Types.Decimal128,
    required: true
  },
  current_price: {
    type: mongoose.Types.Decimal128,
    default: null
  },
  image_url: {
    type: String,
    default: null
  },
  end_time: {
    type: Date,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Set the default value of current_price to the starting_price
itemSchema.pre('save', function(next) {
  if (this.current_price === null) {
    this.current_price = this.starting_price;
  }
  next();
});



itemSchema.plugin(plm);

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
