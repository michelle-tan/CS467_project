var router = require('express').Router()
var User = require("../models/user");

// add a new address for a user
router.post('/', function (req, res) {
    User.findByIdAndUpdate(req.body.user_id, { $push: { addresses: { ...req.body.address } } }, { new: true, select: "addresses" }, function (err, result) {
        console.log(req.body);
        if (err) {
            console.log(err)
            res.sendStatus(500)
            return
        }
        res.status(200).send(result)
    })
})

// deelete an address
router.delete('/:address_id', function (req, res) {
    User.findByIdAndUpdate(req.body.user_id, { $pull: { addresses: { _id: req.params.address_id } } }, { new: true }, function (err, result) {
        if (err) {
            console.log(err)
            res.sendStatus(500)
            return
        }
        res.status(200).send(result)
    })
})

//update an address
router.put('/:address_id', function (req, res) {
    User.findOneAndUpdate({ _id: req.body.user_id, "addresses._id": req.params.address_id }, { $set: { "addresses.$": req.body.address } }, { new: true }, function (err, result) {
        console.log(result);
        if (err) {
            console.log(err)
            res.sendStatus(500)
            return
        }
        res.status(200).send(result.addresses)
    })
})

//get all the addresses associated with a user
router.get('/:user_id', function (req, res) {
    User.findById(req.params.user_id, function (err, result) {
        if (err) {
            console.log(err)
            res.sendStatus(500)
            return
        }
        res.status(200).send(result.addresses)
    })
})

module.exports = router