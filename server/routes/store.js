var express = require("express");
var router = express.Router();
var Store = require("../models/store");
var Product = require("../models/product");
var User = require("../models/user");
var multer = require("multer");
var upload = multer({ dest: "uploads" });

//store owner dashboard that he can see
router.get("/:storename/dashboard", function(req, res) {
  res.send("if shop owner do stuff here");
});

//User has the option to create store will go to page to fill out basic information
router.post("/createstore", upload.single("file"), function(req, res) {
  
  var storename = req.body.storename;
  var description = req.body.description;
  var owner = {
    id: req.user._id,
    username: req.body.username
  };
  console.log(req.file);
  console.log(req);
  //console.log("file path " + req.file);
  var image_path = req.body.file || "no image path";

  var newStore = {
    name: storename,
    description: description,
    owner: owner,
    image_path: image_path
  };
  Store.create(newStore, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      User.findByIdAndUpdate(
        newlyCreated.owner.id,
        { $set: { isSeller: true } },
        function(err, user) {
          if (err) {
            console.log(err);
          } else {
            user.storesOwned.push(newlyCreated.name);
            user.save();
            res.send("created store.");
          }
        }
      );
    }
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
        if (foundStore == null) {
          res.status(204).send();
        } else {
          res.status(200).send(foundStore.products);
        }
      }
    });
});

//go to addproducts page from the dashboard to add products
router.post(
  "/:storename/dashboard/addproducts",
  upload.single("file"),
  function(req, res) {
    console.log(req.body);
    var newProduct = new Product({
      name: req.body.name,
      description: req.body.description,
      Quantity: req.body.quantity,
      Price: req.body.price,
      Weight: req.body.weight,
      NumberSold: 0,
      image_path: req.file.path,
      tags: req.body.tags,
      store: req.body.store,
      owner: req.body.owner
    });

    //console.log(req);
    //console.log(req.params.storename);
    Store.findOne({ name: req.params.storename }, function(err, store) {
      console.log(store);

      if (store == null) {
        res.status(204).send("Invalid Store");
      } else if (err) {
        console.log("theres an error");
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
            res.status(201).send("added " + product); // changed to send 201 status instead of 200
          }
        });
      }
    });
  }
);

//have to create edit and update routes

router.get("/:storename/dashboard/edit", function(req, res) {
  Store.findOne({ name: req.params.storename }, function(err, foundStore) {
    if (err) {
      console.log(err);
    } else {
      res.send(foundStore);
    }
  });
});

//page for editing a product
router.get("/editProduct/:id", function(req, res) {
  console.log("gettingproduct");
  Product.findById({ _id: req.params.id }, function(err, foundProduct) {
    if (err) {
      console.log(err);
    } else {
      res.send(foundProduct);
    }
  });
});

//update the product
router.post("/updateProduct/:id", function(req, res) {
  Product.findByIdAndUpdate({ _id: req.params.id }, req.body.formData, function(
    err,
    updatedProduct
  ) {
    if (err) {
      console.log("errpr");
    } else {
      console.log(updatedProduct);
    }
  });
});

router.delete("/:id", function(req, res) {
  Product.findByIdAndDelete({ _id: req.params.id }, function(
    err,
    deletedProduct
  ) {
    if (err) {
      console.log(err);
    } else {
      console.log("deleted product");
    }
  });
});

//default route for going to specific store
router.get("/:storename", function(req, res) {
  res.send("going to " + req.params.storename);
});

module.exports = router;
