const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const plm = require("passport-local-mongoose")

const bidSchema = new Schema({
  item_id: {
    type: Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bid_amount: {
    type: mongoose.Types.Decimal128,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});


bidSchema.plugin(plm);

const Bid = mongoose.model('Bid', bidSchema);

module.exports = Bid;
