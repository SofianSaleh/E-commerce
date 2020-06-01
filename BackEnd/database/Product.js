const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    // type: mongoose.Types.ObjectId,
    // ref: image,
  },
  images: {
    type: [String],

    // type: [mongoose.Types.ObjectId],
    // ref: image,
  },
  description: {
    type: Text,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  short_description: {
    type: String,
  },
  category_id: {
    type: mongoose.Types.ObjectId,
    ref: category,
  },
});

module.exports = mongoose.model("Product", productSchema);
