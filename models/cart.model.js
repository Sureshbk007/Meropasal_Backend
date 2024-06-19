import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    product: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true,
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Cart = new mongoose.model("Cart", cartSchema);
