const express = require("express");
const authrouter = express.Router();
const authcontroller = require('../controllers/authcontroller')
authrouter.get("/login",authcontroller.logincontroller);
authrouter.post('/postlogin',authcontroller.postlogincontroller);
authrouter.get('/register',authcontroller.registercontroller);
authrouter.post('/postregister',authcontroller.postregistercontroller);
authrouter.get("/logout",authcontroller.logoutcontroller)
module.exports = authrouter;