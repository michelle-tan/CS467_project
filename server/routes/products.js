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

// get products with the same tag
router.get("/relatedProducts", function(req, res) {
  let tagArray = req.query.q.split(" ").map(el => {
    return el.charAt(0).toUpperCase() + el.toLowerCase().slice(1);
  });
  //console.log(tagArray);
  Product.find(
    {
      tags: { $in: tagArray }
    },
    function(err, products) {
      let productList = [];
      products.forEach(function(product) {
        productList.push(product);
      });
      res.send(productList);
      if (err) {
        console.log("error:");
        console.log(err);
      }
    }
  );
});

// Search for a specific product, where the item tags have to match ALL the params passed into it
router.get("/searchProducts", function(req, res) {
  let tagArray = req.query.q.split(" ").map(el => {
    return el.charAt(0).toUpperCase() + el.toLowerCase().slice(1);
  });
  Product.find(
    {
      tags: { $all: tagArray }
    },
    function(err, products) {
      let productList = [];
      products.forEach(function(product) {
        productList.push(product);
      });
      res.send(productList);
      if (err) {
        console.log("error:");
        console.log(err);
      }
    }
  );
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
