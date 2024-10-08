import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
    min: 1,
  },
  size: String,
  color: String,
});

const shippingDetails = new mongoose.Schema({
  recipientName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: String,
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  landmark: String,
});

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, unique: true, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [orderItemSchema],
    totalAmount: { type: Number, required: true, min: 0 },
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
    shippingDetails: shippingDetails,
    payment: {
      paymentId: { type: String, unique: true },
      paymentMethod: { type: String, enum: ["COD", "ESEWA"], required: true },
      paymentStatus: {
        type: String,
        enum: ["PAID", "UNPAID"],
        required: true,
        default: "UNPAID",
      },
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
