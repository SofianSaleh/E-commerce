const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let orderSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  orders_id: [{ type: Schema.Types.ObjectId, ref: "OrderDetails" }],
});

module.exports = mongoose.model("Order", orderSchema);
