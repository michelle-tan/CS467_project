var Rating = require("../models/ratings.js");
var Product = require("../models/product")
var express = require("express");
var router = express.Router();

// get reviews by product
router.get('/:product_name', function(req, res){
    Product.find({name: req.params.product_name}, "ratings", function(err, result){
        if(err){
            console.log(err)
            res.sendStatus(500)
            return
        }
        res.status(200).send(result)
    })

})

// get reviews by username
router.get('/:username', function (req, res) {
    Rating.find({author: { username: req.params.username }}, function(err, result) {
            if (err) {
                console.log(err)
                res.sendStatus(500)
                return
            }
            res.status(200).send(result)
    })
})

// add review
router.post('/:product_name', function(req,res){
    var newRating = new Rating({
        rating: req.body.rating,
        author: {
            username: req.body.username, // only saving the username for now, figure out the id later
        },
    })
    newRating.save(function(err){
        if(err){
            res.sendStatus(500)
            return
        }
        Product.updateOne({ name: req.params.product_name }, { $push : { ratings: newRating._id }}, function(err, result){
            if(err)
        })
    })
    
})


// update review


// delete review

module.exports = router