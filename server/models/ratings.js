var mongoose = require("mongoose");

var ratingSchema = mongoose.Schema({
  rating: Number,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  description: String,
  title: String,
  date: {
    type: Date,
    default: Date.now
  },
  images: [
    {
      type: String
    }
  ],
  product: {
      id:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product"
      },
      name: String
    }
});

module.exports = mongoose.model("productRatings", ratingSchema);