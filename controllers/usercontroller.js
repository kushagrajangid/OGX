const Add = require('../models/addvertisment');
const User = require('../models/userdata')
const favourite = require('../models/favourite');
exports.usercontroller = async (req,res)=>{
  const add = await Add.find();
  res.render('home',{ads:add,favourites:favourite});
}
exports.postadd = (req,res) =>{
  const login = req.session.isLoggedIn;
  if(login){
    res.render('postadd');
  }else{
    res.redirect('/login');
  }
}
exports.postAddcontroller = async (req,res) =>{
  try{
  console.log(req.body);
  const userid = req.session.userid;
  const seller = await User.findById(userid);
  const sellername = seller.name;
  const {adType,itemName,price,location,contact} = req.body;
  const slug = req.body.itemName
   .toLowerCase()
    .trim()
    .replace(/\s+/g , '-');
  if (!req.files || req.files.length === 0) {
  return res.status(400).send('No images provided');
}
  
   const image = req.files.map(file => file.filename);
  console.log("this is image url ",image);
  console.log("this is user id ",userid);
  const add = new Add({adType,itemName,price,location,contact,slug,sellername,image,userid});
  await add.save();
  res.redirect('/');
  }catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.render('postadd', {
        error: 'Please enter a unique item name'
      });
    }
    res.status(500).send('Server Error');
  }
}
exports.detailcontroller = async (req, res) => {
  const homeslug = req.params.slug;
  const homes = await Add.findOne({
    slug: homeslug
  });
  res.render('detail', {ad: homes});
};
exports.mydatacontroller = async (req, res) => {
  try {
    const userId = req.session.userid;

    const ads = await Add.find({ userid: userId });

    res.render('myadds', { ads });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};
exports.deletecontroller = async (req,res)=>{
  const addid = req.params.id;
  await Add.findByIdAndDelete({_id:addid});
  console.log("add deleted successfully");
  res.redirect('/myadds');
}
exports.addtofavourite = async (req,res) =>{
  const favid = req.body.adId;
  const userid = req.session.userid;
   const existingFavourite = await favourite.findOne({
    favid,
    userid
  });
   if(existingFavourite) {
    console.log("Already in favourites");
    return res.redirect('/');
  }
  console.log("this is favourite id",favid,"this is user id ",userid);
  const favourites = new favourite({favid,userid});
  await favourites.save();
  res.redirect('/');
}
exports.showfavourite = async (req,res) =>{
  const userid = req.session.userid;
 const favourites = await favourite.find({ userid });
  console.log(favourites);
  const adIds = favourites.map(fav => fav.favid);
  console.log("this is add ides ",adIds);
  const ads = await Add.find({
    _id: { $in: adIds }
  });
  console.log(ads);
  res.render('favourite',{ads})
  // res.redirect('/');
}
exports.deletefavourite = async (req,res) =>{
  const favid = req.body.adId;
  const userid = req.session.userid;
  console.log("this is deleting favourite id ",favid);
 await favourite.deleteOne({favid,userid});
  res.redirect('/favouriteslist')
}