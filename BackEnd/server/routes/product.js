const express = require(`express`);
const {} = require("../../controllers/userController");
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
  } catch (e) {
    res.json({
      success: false,
      message: e.message,
    });
  }
});

module.exports = router;
