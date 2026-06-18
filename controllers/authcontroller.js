const User = require('../models/userdata');
exports.logincontroller = (req,res) =>{
  res.render('login');
}
exports.logoutcontroller = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      return res.redirect('/');
    }
    res.redirect('/');
  });
};
exports.registercontroller = (req,res) =>{
  res.render('createacc');
}
exports.postlogincontroller = async (req,res) =>{
  console.log("this is login body",req.body);
  const {email , password } = req.body;
  const user = await User.findOne({email,password});
  if(!user){
    let msg = "user not exist";
    return res.render("login",{
      error : msg,
    })
  
  }

  req.session.isLoggedIn = true;
  req.session.userid = user._id.toString();
  req.session.username = user.name;
  res.redirect('/');
}
exports.postregistercontroller = (req,res) =>{
  console.log("this is register body",req.body);
  const {name , email , password , confirmpassword} = req.body;
  const user = new User({ name, email , password, confirmpassword});
  user.save().then(()=>{
    res.redirect('/login');
  }).catch((err) => {
  let errorMessage = 'Something went wrong';

  if (err.code === 11000) {
    errorMessage = 'Email already exists';
  }

  res.render('createacc', {
    error: errorMessage
  });
});
}
