const Product = require(`../database/Product`);
const Category = require(`../database/Categories`);

let getAllProducts = async () => {
  try {
    const products = await Product.find()
      .lean()
      .select("title image description price -_id")
      .populate("category_id", Category)
      .lean();

    return products;
  } catch (e) {
    throw e;
  }
};

let getOneProduct = async (productId) => {
  try {
    const product = await Product.findOne({ _id: productId }).lean();
    console.log(product);
    return product;
  } catch (e) {
    throw e;
  }
};

module.exports = { getAllProducts, getOneProduct };
