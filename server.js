var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    User        = require("./models/user");

    mongoose.connect('mongodb://localhost/StoreDatabase', { useNewUrlParser: true, useCreateIndex: true });
    app.use(bodyParser.urlencoded({extended: true}));
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
app.use("/",userRoutes);

app.listen(3000, function(){
    console.log('Listening on port 3000');
})