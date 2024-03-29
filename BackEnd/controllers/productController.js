const Product = require(`../database/Product`);
const Category = require(`../database/Categories`);

let getAllProducts = async (start, end) => {
  try {
    const products = await Product.find()
      .select("title image description price quantity")
      .populate({
        path: "category_id",
        model: "Category",
        select: `title -_id`,
      })
      .lean();
    return {
      count: end - start,
      message:
        products.length > 0 ? ` Products found ` : `No products were found`,
      products: products.slice(start, end),
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
        !!product ? ` Product found ` : `No products were found`,
      product,
    };
  } catch (e) {
    throw e;
  }
};

let getByCategory = async (category, start, end) => {
  try {
    const categorizedProducts = await Product.find().populate({
      path: "category_id",
      match: {
        title: category,
      },
    });
    let products = categorizedProducts
      .filter((cat) => {
        return cat.category_id;
      })
      .slice(start, end);

    return {
      count: products.length,
      message:
        products.length > 0 ? ` Products found ` : ` No products were found `,
      products,
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = { getAllProducts, getOneProduct, getByCategory };
