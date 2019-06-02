var Product = require("../models/product");
var Store = require("../models/store");
var express = require("express");
var router = express.Router();

/* NOTE: Can this be done with populate() - No find is used to get all the products populate used to get the products related to a specific store
      THE BASE LINK IS
        localhost:8080/products
        localhost:3000/products
*/

// get the products so we can display on the main page and users that are shopping can browse(all of them) and returns them in an array of the obj schema. does not req logging in
router.get("/allProducts", function(req, res) {
  Product.find({}, function(err, products) {
    let productList = [];
    products.forEach(function(product) {
      //console.log(product);
      productList.push(product);
    });
    res.send(productList);
  });
});

// get random products
router.get("/randomFeatured", function(req, res) {
  // needs work
});

// get products based on the store name
router.get("/:storename/all", function(req, res) {
  Store.findOne({ name: req.params.storename })
    .populate("products")
    .exec(function(err, foundStore) {
      if (err) {
        console.log(err);
      } else {
        if (foundStore == null) {
          res.status(204).send();
        } else {
          res.status(200).send(foundStore.products);
        }
      }
    });
});

// when the user clicks the link for a specific product so they can look at the specific product
router.get("/:id", function(req, res) {
  let id = req.params.id;

  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    //valid ObjectId, proceed with `findById` call.
    Product.findById(id).then(item => {
      if (!item) {
        console.log("item does not exist");
        return res.status(204).send();
      }
      return res.status(200).send(item);
    });
  } else {
    res.status(400).send("invalidRequest");
  }
});

module.exports = router;
