var express = require('express');
var router = express.Router();
var Store = require("../models/store");
var Product = require("../models/product");

//store owner dashboard that he can see
router.get('/dashboard', function(req,res){
    res.send("if shop owner do stuff here");
})

//User has the option to create store will go to page to fill out basic information
router.post('/createstore', function(req,res){
    console.log(req.user);
    var storename = req.body.storename;
    var description = req.body.description;
    var owner = {
        id: req.user._id,
        username: req.body.username
    }

    var newStore = {name:storename, description: description, owner:owner};
    Store.create(newStore, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            //console.log(newlyCreated);
            res.send("created store");
        }
    })
})

router.post('/:storename/addproducts', function(req,res){
    var newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        Quantity: req.body.quantity,
        Price: req.body.price,
        Weight: req.body.weight,
        NumberSold: 0
    });

    console.log(req);
    Store.findById(req.params.storename, function(err, store){
        if(err){
            console.log(err);
        }else{
            Product.create(newProduct, function(err, productCreated){
                if(err){
                    console.log(err);
                }else{
                    productCreated.save();
                    store.products.push(productCreated);
                    store.save()
                    //console.log(productCreated);
                    res.send("added " + productCreated.name);
                }
            })
        }
    })
})

//default route for going to specific store
router.get('/:storename', function(req,res){
    res.send("going to " + req.params.storename);
});


module.exports = router;