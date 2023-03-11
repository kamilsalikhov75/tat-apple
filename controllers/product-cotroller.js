import { ProductModel } from '../models/product.js';

export const createProduct = async (req, res) => {
  try {
    const doc = new ProductModel({
      title: req.body.title,
      price: req.body.price,
      image: req.body.image,
      count: req.body.count,
      category: req.body.category,
    });

    doc.save();

    res.json({
      message: 'Товар создан',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать товар',
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productID = req.params.id;

    ProductModel.findByIdAndDelete(productID, (err, doc) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: 'Не удалось удалить товар',
        });
      }

      if (!doc) {
        return res.status(404).json({
          message: 'Товар не найден',
        });
      }

      res.json({
        message: 'Товар удален',
      });
    });
  } catch (err) {}
};

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    await ProductModel.findByIdAndUpdate(productId, {
      title: req.body.title,
      price: req.body.price,
      image: req.body.image,
      count: req.body.count,
    });

    res.json({
      message: 'Товар обновлен',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось обновить товар',
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();

    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить товары',
    });
  }
};

export const getOneProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Не удалось найти товар' });
    }

    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить товар',
    });
  }
};
