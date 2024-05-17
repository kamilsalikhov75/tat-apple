import { ProductModel } from '../models/product.js';

export const checkSize = async (req, res, next) => {
  const products = req.body.products;
  const sizeUpdate = [];

  try {
    products.forEach(async (item) => {
      try {
        const productId = item.product;
        const product = await ProductModel.findById(productId);
        if (!product) {
          return res.status(500).json({
            message: 'Не удалось создать заказ',
          });
        }
        const sizes = product.sizes;
        const size = sizes.filter((obj) => obj.size === item.size);

        if (!size.length) {
          return res.status(400).json({ message: 'Нет размера' });
        }

        if (size[0].count < item.count || size[0].count === 0) {
          return res.status(400).json({ message: 'Нет размера' });
        }

        const newSizes = sizes.map((sizeItem) => {
          const sizeObject = sizeItem;

          if (sizeItem.size === item.size) {
            sizeObject.count = sizeItem.count - item.count;
          }

          return sizeObject;
        });

        //  console.log(newSizes)

        const updateObj = {
          productId,
          sizes: newSizes,
        };
        sizeUpdate.push(updateObj);
      } catch (err) {
        return res.status(500).json({
          message: err,
        });
      }
    });
  } finally {
    req.sizeUpdate = sizeUpdate;
    req.products = products;
    next();
  }
};

//  await ProductModel.findByIdAndUpdate(productId, {
//    sizes: newSizes,
//  });
