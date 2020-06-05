const express = require(`express`);
const {
  getAllProducts,
  getOneProduct,
  getByCategory,
} = require("../../controllers/productController");
const router = express.Router();
const Helper = require("../../helpers.js/pages");

// get all the products for the home page

router.get(`/`, async (req, res) => {
  try {
    // Page number that will be passed from the front end
    const { startValue, endValue } = Helper(
      req.query.pages,
      parseInt(req.query.limit)
    );

    let products = await getAllProducts(startValue, endValue);

    res.status(200).json(products);
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
});

// get a single product with the id

router.get(`/:id`, async (req, res) => {
  try {
    let product = await getOneProduct(req.params.id);
    res.status(200).json(product);
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
});

// get products based on the category

router.get(`/category/:categoryName`, async (req, res) => {
  try {
    const { startValue, endValue } = Helper(
      req.query.pages,
      parseInt(req.query.limit)
    );
    let products = await getByCategory(
      req.params.categoryName,
      startValue,
      endValue
    );
    res.status(200).json(products);
  } catch (e) {
    res.status(400).json({
      count: 0,
      message: e.message,
      products: null,
    });
  }
});

module.exports = router;
