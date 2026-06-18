const mongoose = require('mongoose');
const userschema = mongoose.Schema({
  name : {
    type : String,
    require : [true,'first name is required']
  },
  email : {
    type : String,
    require : [true,'email is required'],
    unique : true
  },
  password : {
    type : String,
    require : [true,'password is required']
  },
  confirmPassword : {
    type : String,
    require : [true,'confirm password is also required']
  }
  
})
module.exports = mongoose.model('userdata',userschema);