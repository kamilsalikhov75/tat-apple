import { OrderModel } from '../models/order.js';

export const createOrder = async (req, res) => {
  try {
    console.log(req.body);
    const userId = req.userId;

    const doc = new OrderModel({
      products: req.body.products,
      address: req.body.address,
      user: userId,
      price: req.body.price,
    });

    doc.save();

    res.json({
      message: 'Заказ создан',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать заказ',
    });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await OrderModel.find({ user: userId }).populate(
      'products.id'
    );

    res.json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить товары',
    });
  }
};

export const getOneOrder = async (req, res) => {
  try {
    const productId = req.params.id;
    const userRole = req.userRole;

    const order = await OrderModel.findById(productId)
      .populate('products.product user')
      .exec();

    if (order.user._id.toString() !== req.userId && userRole !== 'admin') {
      res.status(400).json({ message: 'Нет доступа' });
    }
    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить заказ',
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find();

    res.json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить заказы',
    });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    await OrderModel.findByIdAndUpdate(orderId, {
      status: req.body.status,
    });

    res.json({
      message: 'Заказ обновлен',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось обновить заказ',
    });
  }
};
