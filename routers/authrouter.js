const express = require("express");
const authrouter = express.Router();
const authcontroller = require('../controllers/authcontroller')
authrouter.get("/login",authcontroller.logincontroller);
// authrouter.get("/login",(req,res)=>{
//   console.log("now i am in login page");
// });
authrouter.post('/postlogin',authcontroller.postlogincontroller);
authrouter.get('/register',authcontroller.registercontroller);
authrouter.post('/postregister',authcontroller.postregistercontroller);
authrouter.get("/logout",authcontroller.logoutcontroller)
authrouter.get("/otpverification",authcontroller.verificationcontroller);
authrouter.post("/verify",authcontroller.verify);
module.exports = authrouter;