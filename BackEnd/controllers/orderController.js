const Order = require("../database/Order");
const OrderDetails = require("../database/OrderDetails");

let getAllOrders = async () => {
  try {
    const orders = await Order.find()
      .populate({
        path: "orders_id",
        model: "OrderDetails",
        populate: {
          path: "product_id",
          model: "Product",
        },
      })
      .populate({
        path: "user_id",
        model: "User",
        select: "username firstName lastName email",
      });
    return {
      count: orders.length,
      message:
        orders.length > 0
          ? ` All orders have been fetched `
          : ` No orders were found `,
      orders,
    };
  } catch (e) {
    throw e;
  }
};
module.exports = {
  getAllOrders,
};
