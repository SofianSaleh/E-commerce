const Order = require("../database/Order");
const Product = require("../database/Product");
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
    if (products[i].id.match(/^[0-9a-fA-F]{24}$/)) {
      console.log(i)
      let productQuantityCheck = await Product.findOne({ _id: products[i]._id });
console.log(productQuantityCheck)

      if (productQuantityCheck.quantity >= products[i].incart) {
        let newOrderedProduct = new OrderDetails({
          product_id: products[i]._id,
          quantity: products[i].incart,
        });
console.log(newOrderedProduct)
        await newOrderedProduct.save();

        arrOfIds.push(newOrderedProduct._id);

        productQuantityCheck.quantity -= products[i].incart
        productQuantityCheck.save()

         console.log(`hi`)
      } else {
        return ` Not enough items left there are only ${productQuantityCheck.quantity} left of ${productQuantityCheck.title} `;
      }
    }
    }

    return arrOfIds;
  } catch (e) {
    throw e;
  }
};
// Creating the order in the database
let createOrder = async ({ user_id, products }) => {
  try {

    const ordersArr = await addProductsToOrder(products);
    console.log(ordersArr)
    console.log(!Array.isArray(ordersArr));
    if (!Array.isArray(ordersArr)) {
      return {
        success: false,
        message: ` Error `,
        newOrder: ordersArr,
      };
    }
    let newOrder = new Order({
      user_id,
      orders_id: ordersArr,
    });

    await newOrder.save();

    return {
      success:true,
      message: `Your order was saved successfully`,
      order: newOrder,
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
