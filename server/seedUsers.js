
var users = require("./models/user");
var mongoose = require("mongoose");
var Store = require("./models/store");
var Product = require("./models/product");


var newUser = new users({
    username: "cruzst",
    email: "cruzst@gmail.com",
    firstName: "steve",
    lastName: "cruz",
    address:{
        street: "123 Fake St",
        city: "Fake City",
        state: "OR",
        zipcode: 12345
    }
})

function seedUsers(){
    users.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
    });

    Store.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
    })
    Product.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
    })

    users.register(newUser, "password",(err, user)=>{
        if(err){
            console.log(newUser + "registering" + err);
            return;
        }else{
            var storename = "sample store name";
            var description = "sample store";
            var owner = {
            id: user._id,
            username: user.username
            }

            var newStore = {name:storename, description: description, owner:owner};  

            Store.create(newStore, function(err, newStore){
                if(err){
                    console.log(err);
                }else{
                    
                    var newProduct = new Product({
                        name: "glove",
                        description: "cool glove",
                        Quantity: 5,
                        Price: 10,
                        Weight: 10,
                        NumberSold: 0
                    });

                    Product.create(newProduct, function(err, createdProduct){
                        if(err){
                            console.log(err);
                        }else{
                            createdProduct.save();
                            newStore.products.push(createdProduct);
                            newStore.save();
                            console.log("added");
                        }
                    })
                    
                }
            })

        }
    });

}

module.exports = seedUsers;