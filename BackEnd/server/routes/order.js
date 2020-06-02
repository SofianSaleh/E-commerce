const express = require(`express`);
const { getAllOrders } = require("../../controllers/orderController");

const router = express.Router();

router.get(`/`, async (req, res) => {
  try {
    const x = await getAllOrders();
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
