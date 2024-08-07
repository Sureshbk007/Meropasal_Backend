import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  variant: { type: mongoose.Schema.Types.ObjectId, ref: "Product.variants" },
  quantity: { type: Number, required: true },
});

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [cartItemSchema],
  },
  { timestamps: true }
);

export const Cart = new mongoose.model("Cart", cartSchema);
