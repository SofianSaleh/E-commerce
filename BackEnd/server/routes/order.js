const express = require(`express`);
const { getAllOrders } = require("../../controllers/orderController");

const router = express.Router();

router.get(`/`, async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.json(orders);
  } catch (e) {
    return {
      count: 0,
      message: e.message,
      orders: null,
    };
  }
});

module.exports = router;
