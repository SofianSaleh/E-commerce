const { categories, products } = require("./Products");
const users = require("./Users");
const { address, orderDetails, orders } = require("./Orders");
const User = require("../database/User");
const Product = require("../database/Product");
const Category = require("../database/Categories");
const OrderDetails = require("../database/OrderDetails");
const Address = require("../database/Address");
const Order = require("../database/Order");

const db = require("../database/index");
console.log(users)

//  function populateDatabase(
//   users = null,
//   categories = null,
//   products = null,
//   address = null,
//   orderDetails = null,
//   order = null
// ) {
//   for (let i = 0; i < users.length; i++) {
//     const newUser = new User(users[i]);
//      newUser.save().then(p=>console.log(p)).catch(e=>console.log(e.message));
//   }
//   // for (let j = 0; j < categories.length; j++) {
//   //   const newCategory = new Category({ ...categories[j] });
//   //   await newCategory.save();
//   // }
//   // for (let k = 0; k < products.length; k++) {
//   //   const newProduct = new Product({ ...products[k] });
//   //   await newProduct.save();
//   // }
//   // for (let m = 0; m < address.length; m++) {
//   //   const newAddress = new Address({ ...address[m] });
//   //   await newAddress.save();
//   // }
//   // for (let l = 0; l < orderDetails.length; l++) {
//   //   const newOrderDetails = new OrderDetails({ ...orderDetails[l] });
//   //   await newOrderDetails.save();
//   // }
//   // for (let l = 0; l < order.length; l++) {
//   //   const newOrder = new Order({ ...order[l] });
//   //   await newOrder.save();
//   // }
//   console.log(`done`);
// }
populateDatabase(User, [], [], [], [], []);
populateDatabase([], Category, [], [], [], []);
populateDatabase([], [], Product, [], [], []);
populateDatabase([], [], [], Address, [], []);
// populateDatabase([], [], [], [], OrderDetails, []);
// populateDatabase([], [], [], [], [], orders);


