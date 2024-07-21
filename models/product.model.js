import mongoose from "mongoose";
import generateSlug from "../utils/generateSlug.js";

const imageSchema = new mongoose.Schema({
  publicId: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

const variantSchema = new mongoose.Schema({
  color: String,
  size: String,
  price: Number,
  stock: Number,
  images: [imageSchema],
});

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    description: String,
    price: Number,
    stock: Number,
    image: [imageSchema],
    variants: [variantSchema],
  },
  { timestamps: true }
);

// Generate slug before creating/modifying product
productSchema.pre("save", async function (next) {
  if (this.isModified("title")) this.slug = generateSlug(this.title);
  next();
});

export const Product = mongoose.model("Product", productSchema);
