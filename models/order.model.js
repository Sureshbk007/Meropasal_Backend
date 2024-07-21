import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      default: "PENDING",
      enum: [
        "PENDING",
        "PROCESSING",
        "SHIPPING",
        "DELIVERED",
        "CANCELLED",
        "RETURNED",
      ],
    },
    shippingDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShippingDetails",
      required: true,
    },
    paymentMethod: { type: String, enum: ["COD", "ESEWA"], required: true },
    paymentStatus: { type: String, enum: ["PAID", "UNPAID"], required: true },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
