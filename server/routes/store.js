var express = require("express");
var router = express.Router();
var Store = require("../models/store");
var Product = require("../models/product");

//store owner dashboard that he can see
router.get("/:storename/dashboard", function(req, res) {
  res.send("if shop owner do stuff here");
});

//User has the option to create store will go to page to fill out basic information
router.post("/createstore", function(req, res) {
  //console.log(req.user);
  var storename = req.body.storename;
  var description = req.body.description;
  var owner = {
    id: req.user._id,
    username: req.body.username
  };

  var newStore = { name: storename, description: description, owner: owner };
  Store.create(newStore, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      //console.log(newlyCreated);
      res.send("created store");
    }
  });
});

// get the products (all of them) and returns them in an array of the obj schema. does not req logging in
/* NOTE: Can this be done with populate() ?*/
router.get("/products", function(req, res) {
  Product.find({}, function(err, products) {
    let productList = [];
    products.forEach(function(product) {
      console.log(product);
      productMap.push(product);
    });
    res.send(productList);
  });
});

//get the products for the dash board related to a store
router.get("/:storename/dashboard/products", function(req, res) {
  Store.findOne({ name: req.params.storename })
    .populate("products")
    .exec(function(err, foundStore) {
      if (err) {
        console.log(err);
      } else {
        //console.log(foundStore);
        res.send(foundStore);
      }
    });
});

//go to addproducts page from the dashboard to add products
router.post("/:storename/dashboard/addproducts", function(req, res) {
  var newProduct = new Product({
    name: req.body.name,
    description: req.body.description,
    Quantity: req.body.quantity,
    Price: req.body.price,
    Weight: req.body.weight,
    NumberSold: 0
  });

  //console.log(req);
  //console.log(req.params.storename);
  Store.findOne({ name: req.params.storename }, function(err, store) {
    console.log(store);
    if (err) {
      console.log(err);
    } else {
      Product.create(newProduct, function(err, product) {
        if (err) {
          console.log(err);
        } else {
          //console.log(product);
          product.save();
          store.products.push(product);
          store.save();
          //console.log(productCreated);
          res.send("added " + product);
        }
      });
    }
  });
});

//default route for going to specific store
router.get("/:storename", function(req, res) {
  res.send("going to " + req.params.storename);
});

module.exports = router;
