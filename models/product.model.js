import mongoose from "mongoose";
import generateSlug from "../utils/generateSlug.js";

// Review Schema
const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: String,
    image: [
      {
        publicId: String,
        imageUrl: String,
      },
    ],
  },
  { timestamps: true }
);

// Variant Schema
const variantSchema = new mongoose.Schema({
  color: String,
  size: String,
  price: {
    type: Number,
    required: true,
  },
  crossedPrice: Number,
  images: [
    {
      publicId: String,
      imageUrl: String,
    },
  ],
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
});

//Product Schema
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    details: {
      type: String,
      required: true,
    },
    ratings: {
      type: [reviewSchema],
      default: [],
    },
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
