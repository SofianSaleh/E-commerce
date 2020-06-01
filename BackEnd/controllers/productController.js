const Product = require(`../database/Product`);
const Category = require(`../database/Categories`);

let getAllProducts = async (userInfo) => {
  try {
    const products = await Product.find().populate("category_id", Category);

    return products;
  } catch (e) {
    throw e;
  }
};

module.exports = { getAllProducts };
