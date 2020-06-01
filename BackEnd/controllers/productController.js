const Product = require(`../database/Product`);

let getAllProducts = async (userInfo) => {
  try {
    const products = await Product.find()
      .populate("categories")
      .exec((err, product) => {
        res.json({ ...product });
      });
  } catch (e) {
    throw e;
  }
};

module.exports = { getAllProducts };
