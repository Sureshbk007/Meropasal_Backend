import mongoose from "mongoose";

const wishlistItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  variant: { type: mongoose.Schema.Types.ObjectId, ref: "Product.variants" },
});

const wishlistSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [wishlistItemSchema],
  },
  {
    timestamps: true,
  }
);

export const Wishlist = mongoose.model("Wishlist", wishlistSchema);
