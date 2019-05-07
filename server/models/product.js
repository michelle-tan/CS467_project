var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
    name:String,
    description:String,
    image: String,
    Quantity: Number,
    Price: Number,
    Weight: Number,
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

module.exports = mongoose.model("Products", productSchema);