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
    const products = await Product.findOne({ _id: productId }).lean();
    if (products.length === 0) {
      return {
        count: 0,
        message: `No products were found`,
        products: null,
      };
    } else {
      return {
        count: product.length,
        message,
        products,
      };
    }
  } catch (e) {
    throw e;
  }
};

let getByCategory = async (category) => {
  try {
    const categoryId = await Category.findOne({ title: category })
      .lean()
      .select(`_id`);
    const categorizedProducts = Product.find({
      category_id: categoryId._id,
    }).lean();
    console.log(categorizedProducts);
  } catch (e) {
    throw e;
  }
};

module.exports = { getAllProducts, getOneProduct, getByCategory };
