var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require("../models/user");

router.post("/register", function(req, res){

    let datejoined = new Date();
    User.register(new User({
        username:req.body.username,
        email: req.body.email,
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        address:{
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode
        },
        hasStore: false,
        date_join: datejoined
    
    
    }),req.body.password, function(err, user){
           if(err){
                console.log(err);
                
            } //user stragety
            passport.authenticate("local")(req, res, function(){
                res.send("registered"); //once the user sign up
           }); 
        });
    });

router.post('/login', 
    passport.authenticate('local', { failureRedirect: '/' }),
    function(req, res) {
      res.send('loggedin');
    });

router.get('/logout', function(req,res){
    req.logout();
    res.send("loggedout");
})
module.exports = router;