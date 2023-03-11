import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import {
  loginValidation,
  productCreateValidation,
  registerValidation,
} from './validator.js';
import handleValidationError from './handle-validation-error.js';
import {
  getUser,
  userLogin,
  userRegistration,
} from './controllers/user-controller.js';
import { checkAdmin, checkUser } from './check-auth.js';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
} from './controllers/product-cotroller.js';
import {
  createOrder,
  getAllOrders,
  getOneOrder,
  getUserOrders,
  updateOrder,
} from './controllers/order-controller.js';
import multer from 'multer';

const dbUrl =
  'mongodb+srv://tat-apple:79zxLKeAiMNGdIs0@cluster0.xaac9qg.mongodb.net/?retryWrites=true&w=majority/test';

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log('DB ok');
  })
  .catch((err) => console.log('DB error', err));

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);
app.use('/uploads', express.static('uploads'));

app.post('/uploads', upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.post(
  '/auth/register',
  registerValidation,
  handleValidationError,
  userRegistration
);
app.post('/auth/login', loginValidation, handleValidationError, userLogin);
app.get('/auth/user', checkUser, getUser);

app.post('/products', productCreateValidation, createProduct);
app.delete('/products/:id', checkAdmin, deleteProduct);
app.patch('/products/:id', checkAdmin, productCreateValidation, updateProduct);
app.get('/products', getAllProducts);
app.get('/products/:id', getOneProduct);

app.post('/orders', checkUser, createOrder);
app.patch('/orders/:id', checkAdmin, updateOrder);
app.get('/orders', checkUser, getUserOrders);
app.get('/orders/:id', checkUser, getOneOrder);
app.get('/allorders', checkAdmin, getAllOrders);

app.listen(4002, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server OK');
});
