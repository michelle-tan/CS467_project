var users = require("./models/user");


var newUser = new users({
    username: "tanm",
    email: "tanm@gmail.com",
    firstName: "Steve",
    lastName: "Tan",
    address:{
        street: "123 Fake St",
        city: "Fake City",
        state: "CA",
        zipcode: 12345
    },
    isSeller:false
})


function seedMichelle(){

    users.find({"username": "michelleT"}, function(err, foundUser){
        
    if(Object.keys(foundUser).length === 0 ){
            users.register(newUser, "password",(err, user)=>{
                if(err){
                    console.log(user + "registering" + err);
                    return;
                }else{
                    console.log("registered");
                }
            });

           

    }else{
            
            console.log("exists");
            return;
    }
    })
}   
module.exports = seedMichelle;