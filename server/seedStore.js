var mongoose = require("mongoose");
var Store = require("./models/store");
var User = require("./models/user");


function seedStore(){

    User.findOne({name: "steve"}, function(err, found){
        if(err){
            console.log(err);
        }else{
            console.log(found);
        }
    })
    
}

module.exports = seedStore;