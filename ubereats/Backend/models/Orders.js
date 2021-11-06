const mongoose = require('mongoose');

const OrdersSchema = new mongoose.Schema({
  rest_name: {
    type: String,
    required: true
  },
  items: [
    {
      quantity:{
        type: String,
        required: true
      },
      _id:{
        type: String,
        required: true
      },
      rest_name:
      {
        type: String,
        required: true
      },
      item_name:
      {
        type: String,
        required: true
      },
      foodtype:
      {
        type: String,
        required: true
      },
      price:
      {
        type: String,
        required: true
      }
    }
  ]
    
  ,
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