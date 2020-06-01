const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let categorySchema = new Schema({
  title: {
    type: String,
  },
});

module.exports = mongoose.model("Category", categorySchema);
