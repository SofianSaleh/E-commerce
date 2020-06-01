const Product = require(`../database/Product`);

let getAllProducts = async (userInfo) => {
  try {
    const products = await Product.find().populate("category_id");
    console.log(products);
    // .populate("category_id")
    // .exec((err, pro) => console.log(pro));
  } catch (e) {
    throw e;
  }
};

module.exports = { getAllProducts };
