const { default: mongoose } = require("mongoose");
const favouriteschema = mongoose.Schema({
  favid : {
    type : String,
    required: true,
  },
  userid :{
    type : String,
    required : true,
  }
})
module.exports = mongoose.model('favourite',favouriteschema);

