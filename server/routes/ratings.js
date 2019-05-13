var Rating = require("../models/ratings.js");
var Product = require("../models/product")
var express = require("express");
var router = express.Router();

// get reviews by product
router.get('/byProduct/:_id', function(req, res){
    Product.find({_id: req.params._id}, "ratings", function(err, foundRatings){
        if(err){
            console.log(err)
            res.sendStatus(500)
            return
        }
        Rating.find({_id: { $in: foundRatings[0].ratings} }, function(err, joinedRatings){
            if(err){
                console.log(err)
                res.sendStatus(500)
                return
            }
            res.status(200).send(joinedRatings)
        })
        
    })

})

// get reviews by username
router.get('/byUser/:username', function (req, res) {
    console.log("hello")
    Rating.find({author: { username: req.params.username }}, function(err, result) {
        console.log("from getting by " + req.params.username);
        console.log(result)
            if (err) {
                console.log(err)
                res.sendStatus(500)
                return
            }
            res.status(200).send(result)
    })
})

// add review by product id
// does not support looking for product details / if the user actually ordered the item.
router.post('/:_id', function(req,res){
    var newRating = new Rating({
        rating: req.body.rating,
        author: {
            username: req.body.username, // only saving the username for now, figure out the id later
        },
        description: req.body.description,
    })
   
    newRating.save(function(err){
        if(err){
            res.sendStatus(500)
            return
        }
        Product.findOneAndUpdate({ _id: req.params._id }, { $push : { ratings: newRating._id }}, {new:true}, function(err, result){
            if(err){
                console.log(err)
                res.sendStatus(500)
                return
            }
         
            res.status(200).send(result)
            return
        })
    })
    
})


// update review (by review id)
router.put('/:_id', function(req, res){

    // do not allow changing authors.
    if(req.body.updateData.author){
        delete req.body.updateData.author
    }
    Rating.findOneAndUpdate({_id: req.params._id}, {$set:{...req.body.updateData}}, {new:true}, function(err, result){
        if(err){
            console.log(err)
            res.sendStatus(500)
            return
        }
        res.status(200).send(result)
    })
})


// delete review
router.delete('/:_id', function(req, res){
    Rating.deleteOne({_id : req.params._id}, function(err, result){
        if(err){
            console.log(err)
            res.sendStatus(500)
            return
        }
        res.sendStatus(200)
    })
})

module.exports = router