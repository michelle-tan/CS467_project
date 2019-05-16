var mongoose = require("mongoose");

var storeSchema = new mongoose.Schema({
    name: String,
    description: String,
    owner:{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        },
        username: String
        
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Products"
        }
    ],
    image_path:{
        type: String
        
    },
})

module.exports = mongoose.model("Stores", storeSchema);