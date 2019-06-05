var router = require('express').Router();

// use this to add items to a session's cart when a user is logged in - so the user's future sessions can resume as expected
router.put('/', function (req, res) {
    console.log('req.body :', req.body);
    if (req.session.cart) {

        // if item already exists in cart, add new qty to previous
        var index = req.session.cart.findIndex((el) => {
            return el.id === req.body.item.id
        })
        if (index !== -1) {
            req.session.cart[index].qty += parseInt(req.body.item.qty)
        }
        else {
            req.session.cart.push(req.body.item)
        }
    }

    // if cart dne, it should be created.
    else {
        req.session.cart = [];
        req.session.cart.push(req.body.item)
    }

    res.status(200).send(req.session)
})

// use this to get the previous session's cart contents.
router.get('/', function (req, res) {
    if (!req.session.cart) {
        res.sendStatus(404)
    }
    else {
        res.status(200).send(req.session.cart)
    }
})

router.delete('/', function (req, res) {
    if (req.session.cart) {
        var index = req.session.cart.findIndex((el) => {
            return el.id === req.body.id
        })
        if (index !== -1) {
            req.session.cart.splice(index, 1)
            res.status(200).send(req.session.cart)
            return
        }
    }
    res.sendStatus(404)

})

module.exports = router