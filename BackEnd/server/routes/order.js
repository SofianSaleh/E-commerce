const express = require(`express`);
const {
  getAllOrders,
  getSingleOrder,
  createOrder,
} = require("../../controllers/orderController");

const router = express.Router();

// get all orders
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

// get a single order
router.get(`/:id`, async (req, res) => {
  try {
    const order = await getSingleOrder(req.params.id);

    res.json(order);
  } catch (e) {
    return {
      count: 0,
      message: e.message,
      order: null,
    };
  }
});

// add an order
router.post(`/add`, async (req, res) => {
  try {
    const ordered = await createOrder(req.body);
    res.json(ordered);
  } catch (e) {
    return {
      message: e.message,
    };
  }
});

module.exports = router;
