const express = require(`express`);
const { getAllProducts } = require("../../controllers/productController");
const router = express.Router();

router.get(`/`, async (req, res) => {
  try {
    // Page number that will be passed from the front end
    let page =
      req.query.page !== undefined && req.query.page !== 0 ? req.query.page : 1;

    // the limit of items per page

    const limit =
      req.query.limit !== undefined && req.query.limit !== 0
        ? req.query.limit
        : 10;

    let startValue;
    let endValue;

    if (page > 0) {
      startValue = page * limit - limit;
      endValue = page * limit;
    } else {
      startValue = 0;
      endValue = 10;
    }

    let products = await getAllProducts();
    products = products.slice(startValue, endValue);
    res.send({
      count: products.length,
      products,
    });
  } catch (e) {
    res.json({
      success: false,
      message: e.message,
    });
  }
});

module.exports = router;
