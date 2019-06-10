var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  Quantity: Number,
  Price: { type: Number },
  Weight: { type: Number },
  NumberSold: Number,
  tags: [],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "productComments"
    }
  ],
  ratings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "productRating"
    }
  ],
  owner: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users"
    },
    username: String
  },
  store: String
});

module.exports = mongoose.model("Products", productSchema);
