import { ProductModel } from '../models/product.js';

export const createProduct = async (req, res) => {
  try {
    const doc = new ProductModel({
      title: req.body.title,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      category: req.body.category,
    });

    const product = await doc.save();

    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать товар',
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

    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось найти товар',
    });
  }
};

export const removeProduct = async (req, res) => {
  const { id } = req.params;

  ProductModel.findByIdAndDelete(id, (err, doc) => {
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

    return res.json({
      message: 'Товар удален',
    });
  });
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await ProductModel.findByIdAndUpdate(id, {
      model: req.body.model,
      brand: req.body.brand,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      category: req.body.category,
      sizes: req.body.sizes,
      gender: req.body.gender,
    });

    return res.json({
      message: 'Товар обновлен',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось обновить товар',
    });
  }
};

// try{}catch(err){}
