var Rating = require("../models/ratings.js");
var Product = require("../models/product");
var express = require("express");
var router = express.Router();
var multer = require("multer");
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, req.app.get("root") + "/public/images/reviews");
  },
  filename: function(req, file, cb) {
    console.log(file);
    cb(null, Date.now().toString() + "_" + file.originalname);
  }
});
var upload = multer({ storage: storage });

// get reviews by product
router.get("/byProduct/:_id", function(req, res) {
  Product.find({ _id: req.params._id }, "ratings", function(err, foundRatings) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    Rating.find({ _id: { $in: foundRatings[0].ratings } }, function(
      err,
      joinedRatings
    ) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      res.status(200).send(joinedRatings);
    });
  });
});

// get average rating for a product
router.get("/averageRating/:id", function(req, res) {
  Product.find({ _id: req.params.id }, "ratings", function(err, foundRatings) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    Rating.find({ _id: { $in: foundRatings[0].ratings } }, function(
      err,
      joinedRatings
    ) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      let reviewCount = joinedRatings.length;
      let ratingSum = 0;
      joinedRatings.forEach(reviewObj => {
        ratingSum += reviewObj.rating;
      });
      let ratingAvg = ratingSum / reviewCount;
      let ratingObj = { productid: req.params.id, aggregateRating: ratingAvg };
      res.status(200).send(ratingObj);
    });
  });
});

// get reviews by username
router.get("/byUser/:username", function(req, res) {
  Rating.find({ "author.username": req.params.username }, function(
    err,
    ratingsResult
  ) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    console.log("ratingsResult", ratingsResult);
    res.status(200).send(ratingsResult);
  });
});

// add review by product id
// does not support looking for product details / if the user actually ordered the item.
router.post("/:_id", upload.array("images"), function(req, res) {
  console.log(req.body);
  console.log(req.files);
  var formData = JSON.parse(req.body.formData);
  var images = req.files.map(file => file.filename);

  var newRating = new Rating({
    rating: formData.rating,
    author: {
      id: formData.author.id,
      username: formData.author.username // only saving the username for now, figure out the id later
    },
    description: formData.description,
    title: formData.title,
    product: {
      id: formData.product.id,
      name: formData.product.name
    },
    images: images
  });

  newRating.save(function(err) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }
    Product.findOneAndUpdate(
      { _id: req.params._id },
      { $push: { ratings: newRating._id } },
      { new: true },
      function(err, result) {
        if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
        }

        /*        Rating.findByIdAndUpdate(newRating._id, {$set: {'product.name': result.name}}, {new: true}, function(err, updateResult){
                if(err){
                    console.log(err)
                    res.sendStatus(500)
                    return
                }*/
        console.log(newRating);
        res.status(200).send(newRating);
      }
    );
  });
});

// update review (by review id)
router.put("/:_id", upload.array("images"), function(req, res) {
  console.log(JSON.parse(req.body.formData));

  console.log(req.files);

  // do not allow changing authors.
  if (req.body.author) {
    delete req.body.author;
  }
  //  console.log(parsedBody)
  var newimages = req.files.map(file => file.filename);
  var formData = JSON.parse(req.body.formData);
  delete formData.images;

  // for in loop on array skips empty objects, which were added into images above
  /*for(var el in req.body.images){
        images.push(req.body.images[el])
    }*/
  Rating.findOneAndUpdate(
    { _id: req.params._id },
    {
      $set: { ...formData },
      $addToSet: {
        images: {
          $each: newimages
        }
      }
    },
    { new: true },
    function(err, result) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      res.status(200).send(result);
    }
  );
});

// delete review and its reference in product
router.delete("/:_id", function(req, res) {
  Rating.findByIdAndDelete(req.params._id, function(err, ratingsResult) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    Product.findByIdAndUpdate(
      ratingsResult.product.id,
      { $pull: { rating: ratingsResult._id } },
      { new: true },
      function(err, productResult) {
        if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
        }
        res.sendStatus(200);
      }
    );
  });
});

module.exports = router;
