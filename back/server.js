import mongoose from "mongoose";
import express from "express";
import {
  createProduct,
  getAllProducts,
  getOneProduct,
  removeProduct,
  updateProduct,
} from "./controllers/product-controller.js";
import { getUser, login, register } from "./controllers/user-controller.js";
import { loginValidation, registerValidation } from "./validations.js";
import handleValidationErrors from "./utils/handle-validation-errors.js";
import checkToken from "./utils/check-token.js";
import {
  createOrder,
  getOneOrder,
  getUserOrders,
} from "./controllers/order-controller.js";
import { checkSize } from "./utils/size-check.js";
import cors from "cors";
import multer from "multer";
const port = 3001;
const dbUrl =
  "mongodb+srv://kkpmzust1qfd:xk2sjc6O1BZI6uhA@cluster0.rn7liod.mongodb.net/";

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("DB ok");
  })
  .catch((err) => console.log("DB error", err));
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  try {
    res.send("Hello");
  } catch (err) {
    res.send(err);
  }
});

app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  register
);
app.get("/auth/user", checkToken, getUser);
app.post("/auth/login", loginValidation, handleValidationErrors, login);

app.post("/uploads", upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.post("/products", createProduct);
app.get("/products", getAllProducts);
app.get("/products/:id", getOneProduct);
app.delete("/products/:id", removeProduct);
app.patch("/products/:id", updateProduct);

app.post("/orders", checkToken, createOrder);
app.get("/orders", checkToken, getUserOrders);
app.get("/orders/:id", checkToken, getOneOrder);

app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});
