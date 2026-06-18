const express = require('express');
const user = express.Router();
const usercontroller = require('../controllers/usercontroller')
user.get('/',usercontroller.usercontroller);
user.get("/postadd",usercontroller.postadd);
user.post('/post-ad',usercontroller.postAddcontroller);
user.get('/detail/:slug',usercontroller.detailcontroller);
user.get('/myadds',usercontroller.mydatacontroller)
user.post('/addelete/:id',usercontroller.deletecontroller);
user.post('/favourite/add',usercontroller.addtofavourite);
user.get('/favouriteslist',usercontroller.showfavourite);
user.post('/favourite/remove',usercontroller.deletefavourite);
module.exports = user;
