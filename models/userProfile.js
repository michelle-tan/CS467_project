var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var uniqueValidator = require('mongoose-unique-validator');

var profileSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    address: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            zipcode: { type: Number, required: true }
    },
    storeowner: Boolean,
    date_join:{
        type: Date,
        default: Date.now
    }
})

UserSchema.plugin(uniqueValidator, {message: 'is already taken'});
UserSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model("userprofile", profileSchema);
    