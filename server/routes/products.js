var Product = require("./models/product");
var express = require("express");
var router = express.Router();

// get the products so we can display on the main page and users that are shopping can browse(all of them) and returns them in an array of the obj schema. does not req logging in
/* NOTE: Can this be done with populate() - No find is used to get all the products populate used to get the products related to a specific store*/

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

// when the user clicks the link for a specific product so they can look at the specific product
router.get("/products/:id", function(req,res){
    Product.find({})
})