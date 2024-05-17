import mongoose from "mongoose";

const OrderProductSchema = mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  count: {
    type: Number,
    required: true,
  },
});

const OrderSchema = mongoose.Schema(
  {
    products: {
      type: [OrderProductSchema],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const OrderModel = mongoose.model("Order", OrderSchema);
