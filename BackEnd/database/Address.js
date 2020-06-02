const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let addressSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  line1: {
    type: String,
    required: true,
  },
  line2: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  pincode: {
    type: Number,
  },
});

module.exports = mongoose.model("Address", addressSchema);
