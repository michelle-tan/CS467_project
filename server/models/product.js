var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
    name:String,
    description:String,
    Quantity: Number,
    Price: Number,
    Weight: Number,
    NumberSold: Number/*,
    tags: [],
    comments:[

    ],
    ratings:[

    ]*/
})

module.exports = mongoose.model("Products", productSchema);