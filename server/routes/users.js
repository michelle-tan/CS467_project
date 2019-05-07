var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require("../models/user");

router.post("/register", function(req, res){

    var newUser = new User({
        username: req.body.username,
        email: req.body.email,
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        address:{
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode
        },
        isSeller: false
    })

    User.register(newUser,req.body.password, (err, user)=>{
        if(err){
            console.log(newUser + "registering" + err);
            res.sendStatus(500)
            return
        } //user stragety

        passport.authenticate("local", (err, user, info) => {
            if(err){
                console.log("logging up" + err);
                res.sendStatus(500);
                return;
            }

            req.login(user, err => {
                if(err){
                    res.sendStatus(500)
                    return
                }
                 res.sendStatus(200); //once the user sign up
                 return
            });
        })(req,res); 
    });
});

router.post("/login", (req, res, next) => {  
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }
      
        if (!user) {
            return res.status(400).send([user, "Cannot log in", info]);
        }
      
        req.login(user, err => {
            res.send(user);
        });
    })(req, res, next);
});

router.get('/logout', function(req,res){
    req.logout();
    console.log("loggedout");
    res.send("loggedout");
})
module.exports = router;