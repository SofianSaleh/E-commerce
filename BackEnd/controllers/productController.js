const Product = require(`../database/Product`);
const Category = require(`../database/Categories`);

let getAllProducts = async (start, end) => {
  try {
    const products = await Product.find()
      .select("title image description price -_id")
      .populate("category_id", Category)
      .lean();
    return {
      count: products.length,
      message:
        products.length > 0 ? ` Products found ` : `No products were found`,
      products: products.slice(startValue, endValue),
    };
  } catch (e) {
    throw e;
  }
};

let getOneProduct = async (productId) => {
  try {
    const product = await Product.findOne({ _id: productId }).lean();
    return {
      count: product.length,
      message:
        product.length > 0 ? ` Product found ` : `No products were found`,
      product,
    };
  } catch (e) {
    throw e;
  }
};

let getByCategory = async (category, start, end) => {
  try {
    const categoryId = await Category.findOne(
      { title: category },
      { lean: true }
    ).select(`_id`);
    const categorizedProducts = await Product.find({
      category_id: categoryId._id,
    })

      .populate("category_id", Category)
      .lean();
    let products = categorizedProducts.slice(start, end);
    return {
      count: categorizedProducts.length,
      message:
        categorizedProducts.length > 0
          ? ` Products found `
          : ` No products were found `,
      products,
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = { getAllProducts, getOneProduct, getByCategory };
