const Order = require("../database/Order");
const OrderDetails = require("../database/OrderDetails");

// fetching all the orders
let getAllOrders = async () => {
  try {
    const orders = await Order.find()
      .populate({
        path: "orders_id",
        model: "OrderDetails",
        populate: {
          path: "product_id",
          model: "Product",
          select: "title image price",
          populate: {
            path: "category_id",
            model: "Category",
            select: "title",
          },
        },
      })
      .populate({
        path: "user_id",
        model: "User",
        select: "username firstName lastName email",
      })
      .lean();
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

// fetching a single order
let getSingleOrder = async (order_id) => {
  try {
    const singleOrder = await Order.findOne({ _id: order_id })
      .populate({
        path: "orders_id",
        model: "OrderDetails",
        populate: {
          path: "product_id",
          model: "Product",
          select: "title image price",
          populate: {
            path: "category_id",
            model: "Category",
            select: "title",
          },
        },
      })
      .populate({
        path: "user_id",
        model: "User",
        select: "username firstName lastName email",
      })
      .lean();

    return {
      count: 1,
      message: singleOrder
        ? ` All orders have been fetched `
        : ` No orders were found `,
      singleOrder,
    };
  } catch (e) {
    throw e;
  }
};

// placing new order
let addProductsToOrder = async (products) => {
  try {
    let arrOfIds = [];
    for (let i = 0; i < products.length; i++) {
      let newOrderedProduct = new OrderDetails({
        product_id: products[i].id,
        quantity: products[i].quantity,
      });
      await newOrderedProduct.save();
      arrOfIds.push(newOrderedProduct._id);
    }
    console.log(`arrofids`, arrOfIds);

    return arrOfIds;
  } catch (e) {
    throw e;
  }
};
// Creating the order in the database
let createOrder = async ({ user_id, products }) => {
  try {
    const ordersArr = await addProductsToOrder(products);
    let newOrder = new Order({
      user_id,
      orders_id: ordersArr,
    });

    await newOrder.save();

    return {
      message: `Your order was saved successfully`,
      newOrder,
    };
  } catch (e) {
    throw e;
  }
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  createOrder,
};
