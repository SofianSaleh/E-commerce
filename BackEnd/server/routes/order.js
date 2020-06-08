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
    res.status(200).json(orders);
  } catch (e) {
    res.status(400).json({
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

    res.status(200).status(200).json(order);
  } catch (e) {
    res.status(400).json({
      count: 0,
      message: e.message,
      order: null,
    });
  }
});

// add an order
router.post(`/add`, async (req, res) => {
  try {
console.log(req.body)
    const ordered = await createOrder(req.body);
    res.status(200).json(ordered);
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
});

router.post(`/payment`, (req,res) => {
  res.json(
      {
        success:true
      })
})

module.exports = router;
