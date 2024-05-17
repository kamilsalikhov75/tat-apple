import { OrderModel } from "../models/order.js";

export const createOrder = async (req, res) => {
  try {
    const doc = new OrderModel({
      products: req.body.products,
      price: req.body.price,
      user: req.userId,
      address: req.body.address,
    });

    const order = await doc.save();

    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось создать заказ",
    });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await OrderModel.find({ user: userId }).populate("products.id");

    res.json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить заказы",
    });
  }
};

export const getOneOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await OrderModel.findById(orderId).populate(
      "products.product"
    );

    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить заказ",
    });
  }
};
