const { categories, products } = require("./Products");
const users = require("./Users");
const User = require("../database/User");
const Product = require("../database/Product");
const Category = require("../database/Categories");

const db = require("../database/index");

async function populateDatabase(
  users = null,
  categories = null,
  products = null
) {
  for (let i = 0; i < users.length; i++) {
    const newUser = new User({ ...users[i] });
    await newUser.save();
  }
  for (let j = 0; j < categories.length; j++) {
    const newCategory = new Category({ ...categories[j] });
    await newCategory.save();
  }
  for (let k = 0; k < products.length; k++) {
    const newProduct = new Product({ ...products[k] });
    await newProduct.save();
  }
  return ` done`;
}
populateDatabase(users, categories, products);
