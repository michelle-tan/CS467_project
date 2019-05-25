var router = require('express').Router()
var Product = require("../models/product");
var Store = require("../models/store");
var Order = require("../models/order")

// get the orders associated with id as a customer
router.get('/byCustomer/:customer_id', function(req, res){
    console.log(req.params);
    Order.find({"customer.id": req.params.customer_id}, function(err, result){
        console.log(result)
        if(err){
            console.log(err)
            res.sendStatus(500)
        }
        res.status(200).send(result)
    })
})

// get the orders associated with the seller with user_id = seller_id
router.get("/bySeller/:seller_id", function(req, res) {
    console.log(req.params);
    Order.find({ "seller.id": req.params.seller_id }, function(err, result) {
        console.log(result);
        if (err) {
        console.log(err);
        res.sendStatus(500);
        }
        res.status(200).send(result);
    });
});

// create a new order (checkout)
router.post('/', function(req, res){
    console.log(req.body)
    var newOrder = new Order({
        items: JSON.parse(req.body.items),
        tax: req.body.tax,
        shipping: req.body.shipping,
        customer: {
            id: req.body.customer.id,
            username: req.body.customer.username
        },
        seller:{
            id: req.body.seller.id,
            username: req.body.seller.username
        },
        shippingAddress: JSON.parse(req.body.shippingAddress),
        billingAddress: JSON.parse(req.body.billingAddress),
        total: req.body.total,

    })
    newOrder.save(function(err){
        if(err){
            console.log(err)
            res.sendStatus(500)
        }
        res.sendStatus(200)
    })

})

// edit an order, allowing a seller to update the order with a ship date and a tracking number
// currently, it's whenever they FIRST make this request that the order is marked as shipped.
router.put('/:order_id', function(req, res){
    console.log("hey")
    console.log(req.body)
    Order.findOne({ _id: req.params.order_id}, function(err, firstResult){
        if(err){
            console.log("firstQuery: ")
            console.log(err)
            res.sendStatus(500)
            return
        }
        console.log(firstResult)
        if(!firstResult){
            res.sendStatus(404)
            return
        }
        if(firstResult.seller.id != req.body.user_id){
            res.sendStatus(503)
            return
        }
        if(firstResult.tracking){
            res.sendStatus(403)
            return
        }
        
        Order.findOneAndUpdate({_id: req.params.order_id}, {$min: { dateShipped : Date.now()} , tracking: req.body.tracking}, {new:true}, function(err,secondResult){
            if(err){
                console.log("second Query: ")
                console.log(err)
                res.sendStatus(500)
                return
            }
            res.status(200).send(secondResult)
            return
        })    
    })
})

module.exports = router;