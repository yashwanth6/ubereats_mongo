const mongoose = require('mongoose');

const OrdersSchema = new mongoose.Schema({
  orderid: {
    type: Number,
    required: true
  },
  rest_name: {
    type: String,
    required: true
  },
  items: {
    type: String,
    required: true
  },
  price: {
    type: Number
  },
  foodstatus:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('orders', OrdersSchema);