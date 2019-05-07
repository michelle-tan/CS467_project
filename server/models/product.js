var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
    name:String,
    description:String,
    image: String,
    Quantity: Number,
    Price: {type: Number, get: getPrice, set: setPrice},
    Weight: {type: Number, get: getWeight, set: setWeight},
    NumberSold: Number,
    tags: [],
    comments:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productComments"
        }
    ],
    ratings:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productRating"
        }
    ]
})

function getPrice(num){
    return (num/100).toFixed(2);
}

function setPrice(num){
    return num*100;
}

function getWeight(num){
    return (num/100).toFixed(1);
}

function setWeight(num){
    return num*10;
}

module.exports = mongoose.model("Products", productSchema);