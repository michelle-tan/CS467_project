var users = require("./models/user");
var faker = require("faker");
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
    },
    isSeller:true
})


var productsArray = [

]

for (i = 0; i < 20; i++){
    productsArray.push({name: faker.commerce.productName(), description: faker.lorem.sentence(), image: faker.image.image(), Quantity: faker.random.number(), Price: faker.random.number(), Weight: faker.random.number(), NumberSold: 0});
}


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
                    
                    productsArray.forEach(function(newProduct){
                        Product.create(newProduct, function(err, createdProduct){
                            if(err){
                                console.log(err);
                            }else{
                                
                                newStore.products.push(createdProduct);
                                newStore.save().then((data)=>{

                                }).catch((error)=>{
                                
                                })      
                            }
                        })
                    })              
                }
            })
        }
    });

}

module.exports = seedUsers;