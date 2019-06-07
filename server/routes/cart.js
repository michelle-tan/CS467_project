var router = require('express').Router();

/* 
    New cart structure: as of 6/6/2019

    cart:[
        {
            items: [            
                {
                    id:
                    price:
                    qty:
                    name:
                    image:
                }
            ],
            storeInfo:{
                sellerId:
                storeName:
                username:
            }
        }

        
    ]

*/


// use this to add items to a session's cart when a user is logged in - so the user's future sessions can resume as expected
router.put('/', function (req, res) {
    console.log('req.body :', req.body);
    if (req.session.cart) {

        // if item already exists in cart, add new qty to previous

        // find the index of the cart that corresponds to all items from this seller
        var sellerIndex = req.session.cart.findIndex((el) => {
            return el.storeInfo.sellerId === req.body.storeInfo.sellerId
        })

        // if you find this store, now look for this item in the items array
        if (sellerIndex !== -1) {
            var itemIndex = req.session.cart[sellerIndex].items.findIndex((item)=>{
                return item.id === req.body.item.id
            })

            // if you find the item, accumulate the qtys
            if(itemIndex !== -1){
                req.session.cart[sellerIndex].items[itemIndex].qty += parseInt(req.body.item.qty)
            }

            //if you have the store, but not the item
            else{
                // there is no way that a store exists without an items array
                req.session.cart[sellerIndex].items.push(req.body.item)
            }
        }

        // if this is a new store not existing in the cart, make a new entry.
        else {
            req.session.cart.push({storeInfo: req.body.storeInfo, items: [{...req.body.item},]})
         //   req.session.cart[req.body.sellerId].items = []
         //   req.session.cart[req.body.sellerId].items.push(req.body.item)

        }
    }

    // if cart dne, it should be created.
    else {
        req.session.cart = [];
        req.session.cart.push({ items: [req.body.item,], storeInfo: req.body.storeInfo})
    }

    res.status(200).send(req.session.cart)
})

// use this to get the previous session's cart contents.
router.get('/', function (req, res) {
    if (!req.session.cart) {
        res.sendStatus(204)
    }
    else {
        res.status(200).send(req.session.cart)
    }
})

router.delete('/', function (req, res) {
    if (req.session.cart) {
        var sellerIndex = req.session.cart.findIndex((el) => {
            return el.storeInfo.sellerId === req.body.sellerId
        })
        console.log('sellerIndex', sellerIndex)
        if (sellerIndex !== -1) {
            var itemIndex = req.session.cart[sellerIndex].items.findIndex((el)=>{
                return el.id === req.body.itemId
            })

            // if you find the item to be deleted
            if(itemIndex !== -1){
                // if you find the desired item and find that you're trying to delete the last item for this store, just remove the store.
                if (req.session.cart[sellerIndex].items.length === 1) {
                    req.session.cart.splice(sellerIndex, 1)
                }
                // otherwise, remove just the item
                else{
                    req.session.cart[sellerIndex].items.splice(itemIndex, 1)
                }
                return res.status(200).send(req.session.cart)
            }

            
        }
    }

    // if the desired store or item dne,
    return res.sendStatus(404)

})

router.delete('/all', function(req, res){
    
    req.session.cart = []
    res.status(200).send(req.session.cart)
})

module.exports = router