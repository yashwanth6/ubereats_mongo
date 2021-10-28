const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  // _id: {
  //   type: Number,
  //   required: true,
  //   auto:true
  // },
  rest_name: {
    type: String,
    required: true
  },
  item_name: {
    type: String,
    required: true
  },
  foodtype:{
    type: String,
    required: true
  },
  price:{
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('items', ItemSchema);