const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let orderDetailsSchema = new Schema({
  product_id: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

module.exports = mongoose.model("OrderDetails", orderDetailsSchema);
