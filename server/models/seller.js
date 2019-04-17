var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var seller = require("./plugins/sellerplugin");

var SellerSchema = new mongoose.Schema({
    userName: String,
    password: String,
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    address: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            zipcode: { type: Number, required: true }
    },
    date_join:{
        type: Date,
        default: Date.now
    },
    store:{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Store"
        },
        name: String
    }

});

SellerSchema.plugin(seller);
SellerSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model("sellers", SellerSchema);