var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy= require("passport-local").Strategy,
    User        = require("./models/user")


mongoose.connect('mongodb://localhost/StoreDatabase', { useNewUrlParser: true, useCreateIndex: true });
app.use(bodyParser.json({type:"application/json"}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

app.use(require("express-session")({
    secret: "Project for class",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


var userRoutes = require("./routes/users");
var storeRoutes = require("./routes/store");


// allow cors on all requests, at as long as client and server are on separate ports
app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "http://localhost:8081");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
  next();
});

app.use("/",userRoutes);
app.use('/shop',storeRoutes);

app.listen(3000, function(){
    console.log('Listening on port 3000');
})
