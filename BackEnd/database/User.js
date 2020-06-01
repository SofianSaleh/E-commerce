const mongoose = require(mongoose);

let user = new mongoose.Schema({
    id
  username:"",
  password:"",
  email:"",
  fname:"",
  lname:"",
  age :"",
  role :"",
  photoUrl:"",
  type :"",

let User = mongoose.model("User", user);

module.exports = {
  User,
};
