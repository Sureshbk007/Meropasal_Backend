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
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      default: "PENDING",
      enum: [
        "PENDING",
        "PROCESSING",
        "DISPATCHED",
        "DELIVERED",
        "CANCELLED",
        "RETURNED",
      ],
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ["UNPAID", "PAID"],
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["COD", "ESEWA"],
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      city: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      landmark: String,
    },
    contact: {
      fullName: {
        type: String,
        required: true,
      },
      email: String,
      phoneNumber: {
        type: String,
        required: true,
      },
    },
    orderItems: [orderItemSchema],
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
