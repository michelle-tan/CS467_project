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
    Order.find({ "storeInfo.sellerId": req.params.seller_id }, function(err, result) {
        console.log(result);
        if (err) {
        console.log(err);
        res.sendStatus(500);
        }
        res.status(200).send(result);
    });
});

// create a new order (checkout)
// expect: req.body.cart : an array of objects, JSON serialized (sellerid, items[], total, tax, shipping)
// req.body.customerDetails : an object of customer {id, username},  shipping address, billing address (both addresses JSON serialized)
router.post('/', function(req, res){
    console.log(req.body)
    var newOrders = []
    for(var i = 0 ; i < req.body.cart.length; i++){
        newOrders.push({
            ...JSON.parse(req.body.cart[i]),
            ...JSON.parse(req.body.customerDetails)
            
        })
    }
    Order.insertMany(newOrders, (err,result)=>{
        if(err){
            console.log('err', err)
            return res.sendStatus(500)
        }
        return res.sendStatus(200)

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