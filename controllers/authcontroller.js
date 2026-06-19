const User = require('../models/userdata');
const transporter = require('../transporter');
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
  const otp = Math.floor(100000 + Math.random() * 900000);
  req.session.otp = otp;
  req.session.userid = user._id.toString();
  req.session.username = user.name;
  try {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Login OTP',
    text: `Your OTP is ${otp}`
  });

  return res.redirect('/otpverification');
} catch(err) {
  console.log(err);
  return res.render('login',{
    error : 'Unable to send OTP'
  });
}
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
exports.verificationcontroller =  (req,res) =>{
  res.render('verification');
}
exports.verify = (req,res)=>{
  const otp = req.body.otp;
  const OTP = req.session.otp;
  if(Number(otp)===OTP){
    delete req.session.otp;
    req.session.isLoggedIn = true;
  return  res.redirect('/');
  }else{
   return res.render("verification",{error : "enter wrong otp"});
  }
}
