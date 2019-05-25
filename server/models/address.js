var mongoose = require("mongoose")

var addressSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    street: { 
        type: String, 
        required: true 
    },
    city: { 
        type: String, 
        required: true 
    },
    state: { 
        type: String, 
        required: true 
    },
    zipcode: { 
        type: Number, 
        required: true 
    }
});

module.exports = mongoose.model("Addresses", addressSchema);