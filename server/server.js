var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  User = require("./models/user"),
  seedUsers = require("./seedUsers"),
  cors = require("cors"),
  multer = require("multer");

//V1 - this is the one that works with the local database
mongoose.connect("mongodb://localhost/StoreDatabase", {
  useNewUrlParser: true,
  useCreateIndex: true
});

/*
// v2 - attempt to use mongodb cloud - acceptance testing
mongoose.connect(
  "mongodb+srv://sbcruz1:cs467pw@storedatabasev2-em6mz.mongodb.net/test?retryWrites=true",
  {
    useNewUrlParser: true,
    useCreateIndex: true
  }
);
// end v2
*/

app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cors());

app.use(
  require("express-session")({
    secret: "Project for class",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//multer storage functinoality, will save the image paths to a local folder

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./images");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

var upload = multer({ storage: storage });

var upload = multer({ storage: storage });

var userRoutes = require("./routes/users");
var storeRoutes = require("./routes/store");
var productRoutes = require("./routes/products"); // for testing

// allow cors on all requests, at as long as client and server are on separate ports
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  next();
});

seedUsers();
app.use("/", userRoutes);
app.use("/shop", storeRoutes);
app.use("/products", productRoutes); // for testing

app.listen(3000, function() {
  console.log("Listening on port 3000");
});
