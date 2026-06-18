const multer = require('multer');
const path = require('path');
const rootDir = __dirname;
const db_path = "mongodb+srv://kushagrajangid2007:galaxy@cluster.r0lt7gy.mongodb.net/authentication?appName=cluster";
const { default: mongoose } = require('mongoose');
const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const app = express();
const store = new MongoDBStore({
  uri: db_path,
  collection: 'sessions'
});
app.use(
  session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);
app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn;
  res.locals.username = req.session.username;
  next();
});
app.set('view engine','ejs');
app.set('views','views');
app.use(express.static('public'));
const port = 2100;
const user = require('./routers/user.js');
const authentication = require('./routers/authrouter.js');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const storage = multer.diskStorage({
  destination : (req,file,cb) =>{
    cb(null,"uploads/")
  },
  filename : (req,file,cb) =>{
    cb(null, Date.now() + '-' + file.originalname);
  }
})
const fileFilter = (req, file, cb) => {
    console.log("Original Name:", file.originalname);
    console.log("Mimetype:", file.mimetype);

    const allowed = /jpg|jpeg|png|gif|webp/;
    const ext = allowed.test(
        path.extname(file.originalname).toLowerCase()
    );

    console.log("Extension Check:", ext);

    if (ext && file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
          cb(new Error("Only image files are allowed"), false);
    }
};
const multeroption = {
  storage , fileFilter
}

app.use("/uploads",express.static(path.join(rootDir,'uploads')));
app.use(multer(multeroption).array('image', 5));
app.use(user);
app.use(authentication);
app.use((err, req, res, next) => {
    if (err.message === "Only image files are allowed") {
        return res.render('postadd', {
            error: err.message
        });
    }
    next(err); // pass other errors to Express
});
 mongoose.connect(db_path).then(()=>{
    console.log("connected to mongo");   
    app.listen(port,()=>{
      console.log(`server running on adress http://localhost:${port}`)
    })
  }).catch(err=>{
    console.log('error while connecting with to mongo',err);
  })