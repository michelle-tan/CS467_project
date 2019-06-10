var express = require("express");
var router = express.Router();
var Store = require("../models/store");
var Product = require("../models/product");
var User = require("../models/user");
var multer = require("multer");
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, req.app.get("root") + "/public/images/products");
  },
  filename: function(req, file, cb) {
    console.log(file);
    cb(null, Date.now().toString() + "_" + file.originalname);
  }
});
var upload = multer({ storage: storage });

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
  var image_path = req.file.filename || "DEFAULT_SHOP_IMAGE.jpg";

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
router.get("/:storename/products", function(req, res) {
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
      image: req.file.filename,
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

//GET PRODUCT TO EDIT
router.get("/editProduct/:id", function(req, res) {
  Product.findById({ _id: req.params.id }, function(err, foundProduct) {
    if (err) {
      console.log(err);
    } else {
      res.send(foundProduct);
    }
  });
});

//POST PRODUCT TO EDIT
router.post("/updateProduct/:id", upload.single("file"), function(req, res) {
  console.log(req.body);
  if (req.file) {
    var updatedInfo = {
      name: req.body.name,
      description: req.body.description,
      Quantity: req.body.Quantity,
      Price: req.body.Price,
      Weight: req.body.Weight,
      image: req.file.filename,
      tags: req.body.tags
    };
  } else {
    var updatedInfo = {
      name: req.body.name,
      description: req.body.description,
      Quantity: req.body.Quantity,
      Price: req.body.Price,
      Weight: req.body.Weight,
      tags: req.body.tags
    };
  }

  Product.findByIdAndUpdate({ _id: req.params.id }, updatedInfo, function(
    err,
    updatedProduct
  ) {
    if (err) {
      console.log(err);
    } else {
      console.log(updatedProduct);
      res.status(200).send();
    }
  });
});

// DELETE PRODUCT
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

//Get a particular stores information
router.get("/lookup/:storename", function(req, res) {
  Store.findOne({ name: req.params.storename }, function(err, foundStore) {
    if (err) {
      console.log(err);
    } else {
      if (foundStore == null) {
        res.status(204).send("store not found");
      } else {
        res.status(200).send(foundStore);
      }
    }
  });
});

module.exports = router;
