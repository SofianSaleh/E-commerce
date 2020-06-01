const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    // type: Schema.Types.ObjectId,
    // ref: "Image",
  },
  images: {
    type: [String],

    // type: [Schema.Types.ObjectId],
    // ref: "Image",
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
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});

module.exports = mongoose.model("Product", productSchema);
