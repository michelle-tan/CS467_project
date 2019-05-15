var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var cors = require("cors");



router.post("/register", function(req, res) {
  var newUser = new User({
    username: req.body.username,
    email: req.body.email,
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    address: {
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      zipcode: req.body.zipcode
    },
    isSeller: req.body.isSeller
  });

  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    } //user stragety

    passport.authenticate("local", (err, user, info) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }

      req.login(user, err => {
        if (err) {
          res.sendStatus(500);
          return;
        }
        res.status(200).json({
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          isSeller: user.isSeller,
          date_join: user.date_join,
          stores: [user.stores.name]
        }); //once the user sign up
        return;
      });
    })(req, res);
  });
});

router.post("/login", (req, res, next) => {
  console.log("login request");
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(400).send([user, "Cannot log in", info]);
    }

    req.login(user, err => {
      
      res.status(200).json({
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          isSeller: user.isSeller,
          date_join: user.date_join,
          stores: user.stores
        });
    });
  })(req, res, next);
});


// give this req.body.username and req.body.formData (an object containing the fields to update, keys the same as in the model)
router.post('/update', function(req, res){
  console.log('updating')
  User.findOneAndUpdate({ username: req.body.username }, {$set: {...req.body.formData}}, {new:true}, function(err, result){
    if(err){
      console.log(err)
      res.sendStatus(500)
      return
    }
    res.status(200).send(result)
    return

  })
})

router.get('/logout', function(req,res){
    req.logout();
    console.log("loggedout");
    res.send("loggedout");
})
module.exports = router;
