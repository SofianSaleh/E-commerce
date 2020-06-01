const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    // validate: {
    //   validator: function (v) {},
    // },
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  role: {
    type: Number,
    require: true,
    enum: [555, 888],
    defaultValue: 555,
  },
  // type: "",
});

module.exports = mongoose.model("User", userSchema);
