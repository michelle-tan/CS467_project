var express = require("express");
var router = express.Router();
var users = require("../models/user");

router.get("/account/:username", function(req,res){

    users.findOne({username:username}, function(err,user){
        res.send(user);
    })
})