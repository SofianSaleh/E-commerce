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
    res.sendStatus(200).json(orders);
  } catch (e) {
    res.sendStatus(400).json({
      count: 0,
      message: e.message,
      orders: null,
    });
  }
});

// get a single order
router.get(`/:id`, async (req, res) => {
  try {
    const order = await getSingleOrder(req.params.id);

    res.sendStatus(200).sendStatus(200).json(order);
  } catch (e) {
    res.sendStatus(400).json({
      count: 0,
      message: e.message,
      order: null,
    });
  }
});

// add an order
router.post(`/add`, async (req, res) => {
  try {
    const ordered = await createOrder(req.body);
    res.sendStatus(200).json(ordered);
  } catch (e) {
    res.sendStatus(400).json({
      message: e.message,
    });
  }
});

module.exports = router;
