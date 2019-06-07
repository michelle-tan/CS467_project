var mongoose = require("mongoose");

var orderSchema = new mongoose.Schema({
  dateOrdered: {
    type: Date,
    default: Date.now
  },
  dateShipped: Date,
  tax: Number,
  shipping: Number,
  tracking: String,
  // can derive total weight, subtotal
  items: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products"
      },
      qty: Number,
      price: Number,
      name: String,
      image: String
    }
  ],
  customer: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  storeInfo: {
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String,
    storeName: String
  },
  shippingAddress: {
    firstName: String,
    lastName: String,
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zipcode: {
      type: Number,
    }
  },
  billingAddress: {
    firstName: String,
    lastName: String,
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zipcode: {
      type: Number,
    }
  },
  total: Number
  // probably better not to save the payment info...?
  /* shippingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address"
  },
  billingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address"
  }*/
});

module.exports = mongoose.model("Orders", orderSchema);
