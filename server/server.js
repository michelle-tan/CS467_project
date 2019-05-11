var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  User = require("./models/user"),
  seedUser1 = require("./seedUser1"),
  seedUser2 = require("./seedUser2"),
  seedUser3 = require("./seedUser3"),
  cors = require("cors"),
  multer = require("multer");

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb://localhost/StoreDatabase", {
  useNewUrlParser: true,
  useCreateIndex: true
});
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.use(cors({
  origin:['http://localhost:8080'],
  methods:['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
  credentials: true // enable set cookie
}));

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS");
  next();
})

app.use(
  require("express-session")({
    secret: 'mysessionsecretkey',
    resave: false,
    saveUninitialized: true,
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
var userRoutes = require("./routes/users");
var storeRoutes = require("./routes/store");


seedUser1();
seedUser2();
seedUser3();

app.use("/", userRoutes);
app.use("/shop", storeRoutes);

app.listen(3000, function() {
  console.log("Listening on port 3000");
});
