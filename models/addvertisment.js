const mongoose = require('mongoose');

const addSchema = new mongoose.Schema({
  adType: {
    type: String,
    required: [true, 'Type of ad is required']
  },
  itemName: {
    type: String,
    required: [true, 'Item name is required']
  },

  price: {
    type: Number,
    required: [true, 'Price is required']
  },

  location: {
    type: String,
    required: [true, 'Location is required']
  },

  contact: {
    type: String,
    required: [true, 'Contact is required']
  },

slug : {
  type : String,
  required : [true, 'slug is required'],
  unique : true
},

  sellername: {
    type: String,
    required: [true, 'Seller name is required']
  },

  
  image: {
    type: [String],
    required: [true, 'At least one image is required']
  },
  userid : {
    type : String,
    required: true
  }

}, { timestamps: true }); 

module.exports = mongoose.model('Advertisement', addSchema);