var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var cors = require("cors");
var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, req.app.get('root') + "/public/images/profile_images");
  },
  filename: function (req, file, cb) {
    console.log(file)
    cb(null, Date.now().toString() + "_" + file.originalname);
  }
});
var upload = multer({ storage: storage });
router.post("/register", upload.single("image"), function(req, res) {
  req.body = { ...JSON.parse(req.body.formData) }
  console.log(req.file);
  console.log('req.body.formData', req.body)
  

  var profile_image = req.file ? req.file.filename : 'placeholderImage?'

  var newUser = new User({
   ...req.body,
    profile_image: profile_image
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
//          isSeller: user.isSeller,
          date_join: user.date_join,
 //         address: user.address,
          stores: user.storesOwned,
          profileimage: user.profile_image
        }); //once the user sign up
        return;
      });
    })(req, res);
  });
});

// Login
router.post("/login", (req, res, next) => {
  console.log("login request");
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(400).send([user, "Cannot log in", info]);
    }

    console.log(user);
    req.login(user, err => {
      res.status(200).json({
        userinfo: {
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
 //         isSeller: user.isSeller,
          date_join: user.date_join,
          stores: user.storesOwned,
          user_id: user._id,
          address: user.address,
          profileimage: user.profile_image
        },
        cart: req.session.cart || []
      });
    });
  })(req, res, next);
});

// give this req.body.username and req.body.formData (an object containing the fields to update, keys the same as in the model)
router.post("/update", upload.single('image'), function(req, res) {
  console.log(req.body);
  console.log('req.files :', req.file);
  User.findOneAndUpdate(
    { username: req.body.username },
    { $set: { ...JSON.parse(req.body.formData), profile_image: req.file.filename } },
    { new: true },
    function(err, result) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      res.status(200).send(result);
      return;
    }
  );
});

// Logout
router.get("/logout", function(req, res) {
  req.logout();
  console.log("loggedout");
  res.send("loggedout");
});

// Authenticate, will send the user information if it is valid.  Otherwise send an error.
router.get("/authenticate", function(req, res) {
  if (req.isAuthenticated()) {
    //console.log("User was authenticated.");
    res.status(200).send(req.user);
  } else {
    //console.log("User was not authenticated.");
    res.status(204).send();
  }
});

// Get a user's information
router.get("/getuser/:id", function(req, res) {
  let id = req.params.id;

  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    //valid ObjectId, proceed with `findById` call.
    User.findById(id).then(user => {
      if (!user) {
        console.log("User does not exist");
        return res.status(204).send();
      }
      return res.status(200).send(user);
    });
  } else {
    res.status(400).send("invalidRequest");
  }
});

module.exports = router;
